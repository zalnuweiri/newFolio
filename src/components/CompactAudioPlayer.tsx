import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Upload, Repeat, Gauge, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

// Default songs that users can cycle through
const DEFAULT_SONGS = [
  {
    name: 'Track 1 - Electronic Dreams',
    url: '/diamono.mp3', // Must start with / for public folder
  },
  {
    name: 'Track 2 - Ambient Waves',
    url: '/saintcirc.mp3', // Must start with / for public folder
  },
  {
    name: 'Track 3 - Synthwave Sunset',
    url: '/diamono.mp3', // Must start with / for public folder
  }
];

export function CompactAudioPlayer() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isUsingDefaultSong, setIsUsingDefaultSong] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadHint, setShowUploadHint] = useState(true);
  const [progressTooltip, setProgressTooltip] = useState<{ show: boolean; time: number; x: number }>({
    show: false,
    time: 0,
    x: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastBeatTimeRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Load default song on mount
  useEffect(() => {
    if (audioRef.current && !audioFile && isUsingDefaultSong) {
      audioRef.current.src = DEFAULT_SONGS[currentSongIndex].url;
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, []);

  useEffect(() => {
    if (audioFile && audioRef.current) {
      setIsUsingDefaultSong(false);
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioFile, volume, playbackRate, isLooping]);

  // Setup audio context when audio is ready to play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setupAudioContext = () => {
      if (!audioContextRef.current && audio.src) {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;

          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
          sourceRef.current = source;
        } catch (error) {
          console.error('Error setting up audio context:', error);
        }
      }
    };

    audio.addEventListener('loadedmetadata', setupAudioContext);
    
    // If audio already has metadata, set up immediately
    if (audio.readyState >= 1) {
      setupAudioContext();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', setupAudioContext);
    };
  }, [audioFile, isUsingDefaultSong]);

  useEffect(() => {
    if (isPlaying && analyserRef.current && canvasRef.current) {
      visualize();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'arrowleft':
          e.preventDefault();
          skipBackward();
          break;
        case 'arrowright':
          e.preventDefault();
          skipForward();
          break;
        case 'arrowup':
          e.preventDefault();
          handleVolumeChange({ target: { value: String(Math.min(1, volume + 0.1)) } } as any);
          break;
        case 'arrowdown':
          e.preventDefault();
          handleVolumeChange({ target: { value: String(Math.max(0, volume - 0.1)) } } as any);
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'l':
          e.preventDefault();
          toggleLoop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [volume, isPlaying, audioFile]);

  // Drag and drop handlers
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('audio/')) {
          setAudioFile(file);
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const detectBeat = (dataArray: Uint8Array, lowEnd: number, highEnd: number): boolean => {
    let sum = 0;
    for (let i = lowEnd; i < highEnd; i++) {
      sum += dataArray[i];
    }
    const average = sum / (highEnd - lowEnd);
    return average > 200;
  };

  const createParticles = (x: number, y: number, intensity: number, color: string) => {
    const particleCount = Math.floor(intensity / 20);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 60 + 40,
        size: Math.random() * 4 + 2,
        color
      });
    }
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      return particle.life > 0;
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.25;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      // Clear canvas with trail effect - solid dark background
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = '#0b0b12';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Detect beat
      const currentTime = Date.now();
      if (detectBeat(dataArray, 0, 10) && currentTime - lastBeatTimeRef.current > 200) {
        lastBeatTimeRef.current = currentTime;
        createParticles(centerX, centerY, 255, '#a855f7');
      }

      // Update and draw particles
      updateParticles();
      drawParticles(canvasCtx);

      // Draw center glow - static color
      const bassIntensity = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const glowSize = radius + (bassIntensity / 255) * 50;
      const gradient = canvasCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
      gradient.addColorStop(0, `rgba(168, 85, 247, ${bassIntensity / 400})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${bassIntensity / 600})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      canvasCtx.fillStyle = gradient;
      canvasCtx.beginPath();
      canvasCtx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
      canvasCtx.fill();

      // Draw radial frequency bars
      const barCount = 120;
      const angleStep = (Math.PI * 2) / barCount;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const value = dataArray[dataIndex];
        const angle = i * angleStep;

        // Calculate bar height with smoothing - increased multiplier for larger bars
        const barHeight = (value / 255) * (Math.min(centerX, centerY) * 0.7);

        // Rainbow color based on position in circle
        const hue = (i / barCount) * 360;
        const saturation = 100;
        const lightness1 = 50;
        const lightness2 = 65;

        const color1 = `hsl(${hue}, ${saturation}%, ${lightness1}%)`;
        const color2 = `hsl(${hue}, ${saturation}%, ${lightness2}%)`;

        // Inner bar (main visualization)
        canvasCtx.save();
        canvasCtx.translate(centerX, centerY);
        canvasCtx.rotate(angle);

        const barGradient = canvasCtx.createLinearGradient(0, -radius, 0, -radius - barHeight);
        barGradient.addColorStop(0, color1);
        barGradient.addColorStop(1, color2);

        canvasCtx.fillStyle = barGradient;
        canvasCtx.shadowBlur = 20;
        canvasCtx.shadowColor = color2;
        canvasCtx.fillRect(-3, -radius, 6, -barHeight);

        // Mirror effect (outer)
        canvasCtx.fillRect(-2, radius + 6, 4, barHeight * 0.7);
        canvasCtx.globalAlpha = value / 255;

        canvasCtx.restore();

        // Create particles for high frequencies
        if (value > 230 && Math.random() > 0.95) {
          const particleX = centerX + Math.cos(angle) * (radius + barHeight);
          const particleY = centerY + Math.sin(angle) * (radius + barHeight);
          createParticles(particleX, particleY, value, hslToHex(hue, saturation, lightness2));
        }
      }

      // Draw center circle
      const centerGradient = canvasCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.8);
      centerGradient.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
      centerGradient.addColorStop(1, 'rgba(15, 23, 42, 0.5)');
      canvasCtx.fillStyle = centerGradient;
      canvasCtx.beginPath();
      canvasCtx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      canvasCtx.fill();

      // Pulsing center dot - static color
      const pulseSize = 6 + (bassIntensity / 255) * 12;
      const dotGradient = canvasCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
      dotGradient.addColorStop(0, '#ffffff');
      dotGradient.addColorStop(0.5, '#a855f7');
      dotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      canvasCtx.fillStyle = dotGradient;
      canvasCtx.shadowBlur = 25;
      canvasCtx.shadowColor = '#a855f7';
      canvasCtx.beginPath();
      canvasCtx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      canvasCtx.fill();
    };

    draw();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Resume audio context if suspended (browser autoplay policy)
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;

    setProgressTooltip({
      show: true,
      time: Math.max(0, Math.min(duration, time)),
      x: e.clientX - rect.left
    });
  };

  const handleProgressMouseLeave = () => {
    setProgressTooltip({ show: false, time: 0, x: 0 });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const VolumeVisualizer = () => {
    const bars = 5;
    const activeVolume = isMuted ? 0 : volume;
    const activeBars = Math.ceil(activeVolume * bars);

    return (
        <div className="flex gap-1 items-end h-5">
          {Array.from({ length: bars }).map((_, i) => (
              <motion.div
                  key={i}
                  className={`w-1 rounded-full ${
                      i < activeBars ? 'bg-purple-400' : 'bg-slate-600'
                  }`}
                  initial={{ height: 4 }}
                  animate={{
                    height: i < activeBars ? [4, 12 + i * 2, 4] : 4
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying && i < activeBars ? Infinity : 0,
                    delay: i * 0.1
                  }}
              />
          ))}
        </div>
    );
  };

  const cycleDefaultSongs = () => {
    if (isUsingDefaultSong) {
      const nextIndex = (currentSongIndex + 1) % DEFAULT_SONGS.length;
      setCurrentSongIndex(nextIndex);
      if (audioRef.current) {
        audioRef.current.src = DEFAULT_SONGS[nextIndex].url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
      <div className="w-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Compact Layout: Visualization + Controls Side by Side */}
          <div className="flex flex-col lg:flex-row">
            {/* Visualization Canvas with Drag & Drop */}
            <div
                ref={dropZoneRef}
                className={`relative h-64 lg:h-80 flex-shrink-0 lg:w-2/3 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-300 ${
                    isDragging ? 'ring-4 ring-purple-500 ring-inset' : ''
                }`}
            >
              <canvas
                  ref={canvasRef}
                  width={1200}
                  height={480}
                  className="w-full h-full"
              />

              <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-purple-400"
                    >
                      <div className="text-center">
                        <Upload className="w-12 h-12 mx-auto mb-2 text-purple-300" />
                        <p className="text-white text-sm">Drop audio file</p>
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>

              {!audioFile && !isDragging && !isUsingDefaultSong && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center"
                      >
                        <Upload className="w-8 h-8 text-purple-400" />
                      </motion.div>
                      <p className="text-purple-300 text-sm">Upload or drag & drop audio</p>
                    </div>
                  </motion.div>
              )}
            </div>

            {/* Compact Controls Section */}
            <div className="flex-1 p-4 lg:p-6 flex flex-col justify-between">
              {/* File Info */}
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white truncate">
                      {audioFile ? audioFile.name : (isUsingDefaultSong ? DEFAULT_SONGS[currentSongIndex].name : 'No file selected')}
                    </h3>
                    <p className="text-purple-300/60 text-xs">
                      {audioFile ? `${(audioFile.size / (1024 * 1024)).toFixed(2)} MB` : `Track ${currentSongIndex + 1} of ${DEFAULT_SONGS.length}`}
                    </p>
                  </div>
                  
                  {/* Track Navigation (visible only for default songs) */}
                  {isUsingDefaultSong && !audioFile && (
                    <div className="flex items-center gap-1 ml-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const prevIndex = currentSongIndex === 0 ? DEFAULT_SONGS.length - 1 : currentSongIndex - 1;
                          setCurrentSongIndex(prevIndex);
                          if (audioRef.current) {
                            audioRef.current.src = DEFAULT_SONGS[prevIndex].url;
                            if (isPlaying) audioRef.current.play();
                          }
                        }}
                        className="w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-700 backdrop-blur-sm transition-all flex items-center justify-center text-purple-300"
                        title="Previous track"
                      >
                        <SkipBack className="w-3 h-3" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const nextIndex = (currentSongIndex + 1) % DEFAULT_SONGS.length;
                          setCurrentSongIndex(nextIndex);
                          if (audioRef.current) {
                            audioRef.current.src = DEFAULT_SONGS[nextIndex].url;
                            if (isPlaying) audioRef.current.play();
                          }
                        }}
                        className="w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-700 backdrop-blur-sm transition-all flex items-center justify-center text-purple-300"
                        title="Next track"
                      >
                        <SkipForward className="w-3 h-3" />
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {/* Upload hint notification */}
                <AnimatePresence>
                  {showUploadHint && isUsingDefaultSong && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 flex items-center gap-2 text-[10px] text-cyan-400/70 bg-cyan-500/5 border border-cyan-500/20 rounded-lg px-2 py-1"
                    >
                      <Music className="w-3 h-3 flex-shrink-0" />
                      <span className="flex-1">Don't like these tracks? Upload your own music!</span>
                      <button
                        onClick={() => setShowUploadHint(false)}
                        className="text-cyan-400/50 hover:text-cyan-400 transition-colors"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div
                  className="mb-3 relative pr-39"
                  ref={progressBarRef}
                  onMouseMove={handleProgressMouseMove}
                  onMouseLeave={handleProgressMouseLeave}
              >
                <div className="relative">
                  <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-slate-700/50 rounded-lg appearance-none cursor-pointer slider backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(currentTime / duration) * 100}%, rgba(51, 65, 85, 0.5) ${(currentTime / duration) * 100}%, rgba(51, 65, 85, 0.5) 100%)`
                      }}
                  />

                  <AnimatePresence>
                    {progressTooltip.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-8 bg-slate-800/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs border border-purple-500/30"
                            style={{ left: `${progressTooltip.x}px`, transform: 'translateX(-50%)' }}
                        >
                          {formatTime(progressTooltip.time)}
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between mt-1 text-xs text-purple-300/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons - Compact Layout */}
              <div className="flex items-center justify-start gap-2 mb-3 pl-16">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleLoop}
                    className={`w-8 h-8 rounded-full backdrop-blur-sm transition-all flex items-center justify-center ${
                        isLooping
                            ? 'bg-purple-500/50 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-slate-700/30 text-purple-300 hover:bg-slate-700/50'
                    }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={skipBackward}
                    className="w-8 h-8 rounded-full bg-slate-700/30 hover:bg-slate-700/50 backdrop-blur-sm transition-all flex items-center justify-center text-white"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center text-white shadow-lg shadow-purple-500/50"
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="pause"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                        >
                          <Pause className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="play"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                        >
                          <Play className="w-5 h-5 ml-0.5" />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={skipForward}
                    className="w-8 h-8 rounded-full bg-slate-700/30 hover:bg-slate-700/50 backdrop-blur-sm transition-all flex items-center justify-center text-white"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </motion.button>

                <div className="relative">
                  <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="w-8 h-8 rounded-full bg-slate-700/30 hover:bg-slate-700/50 backdrop-blur-sm transition-all flex items-center justify-center text-purple-300"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                  </motion.button>

                  <AnimatePresence>
                    {showSpeedMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute bottom-full mb-2 right-0 bg-slate-800/95 backdrop-blur-xl rounded-xl p-1.5 shadow-2xl border border-white/10 min-w-[80px]"
                        >
                          {playbackSpeeds.map((speed) => (
                              <motion.button
                                  key={speed}
                                  whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                                  onClick={() => handlePlaybackRateChange(speed)}
                                  className={`w-full px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                      playbackRate === speed
                                          ? 'bg-purple-500/30 text-white'
                                          : 'text-purple-300 hover:text-white'
                                  }`}
                              >
                                {speed}x
                              </motion.button>
                          ))}
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Volume and Upload Controls - Compact */}
              <div className="flex items-center gap-3">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="text-purple-300 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-slate-700/50 rounded-lg appearance-none cursor-pointer slider backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(isMuted ? 0 : volume) * 100}%, rgba(51, 65, 85, 0.5) ${(isMuted ? 0 : volume) * 100}%, rgba(51, 65, 85, 0.5) 100%)`
                    }}
                />

                <VolumeVisualizer />

                <div className="flex-1" />

                <label>
                  <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                  />
                  <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all cursor-pointer backdrop-blur-sm flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span className="text-xs">Upload</span>
                  </motion.div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
        />
      </div>
  );
}