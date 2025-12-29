import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Briefcase, Award, Calendar, Star, User } from 'lucide-react';

interface InfoCubeProps {
  theme: 'dark' | 'light';
}

export function InfoCube({ theme }: InfoCubeProps) {
  const [rotation, setRotation] = useState({ x: -20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentFace, setCurrentFace] = useState(0);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const cubeRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number>();
  const lastInteractionTime = useRef<number>(Date.now());

  // Cube faces content
  const faces = [
    {
      title: 'EXPERIENCE',
      icon: Briefcase,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-500',
      items: ['5+ Years', 'Frontend Dev', '50+ Projects', 'Remote Work'],
    },
    {
      title: 'SKILLS',
      icon: Code2,
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
      items: ['React/TypeScript', 'UI/UX Design', 'GSAP Animations', 'Tailwind CSS'],
    },
    {
      title: 'ACHIEVEMENTS',
      icon: Award,
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-500',
      items: ['Top Rated', 'Award Winner', 'Published Work', 'Open Source'],
    },
    {
      title: 'AVAILABILITY',
      icon: Calendar,
      color: '#10b981',
      gradient: 'from-green-500 to-emerald-500',
      items: ['Available Now', 'Full-time', 'Contract OK', 'Remote Ready'],
    },
  ];

  // Top and bottom faces
  const topFace = {
    title: 'TOP',
    icon: Star,
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    items: ['More', 'Content', 'Coming', 'Soon'],
  };

  const bottomFace = {
    title: 'BOTTOM',
    icon: User,
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-500',
    items: ['Stay', 'Tuned', 'For', 'Updates'],
  };

  // Auto-rotate when not interacting
  useEffect(() => {
    if (!isDragging && autoRotateEnabled) {
      const startTime = Date.now();
      const startRotation = rotation.y;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newY = startRotation + elapsed * 0.02; // Slow rotation speed
        
        setRotation(prev => ({
          x: prev.x,
          y: newY,
        }));
        
        autoRotateRef.current = requestAnimationFrame(animate);
      };
      
      // Only start auto-rotate if enough time has passed since last interaction
      const timeSinceInteraction = Date.now() - lastInteractionTime.current;
      if (timeSinceInteraction > 1000) {
        autoRotateRef.current = requestAnimationFrame(animate);
      }
    }

    return () => {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [isDragging, autoRotateEnabled, rotation.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotateEnabled(false);
    lastInteractionTime.current = Date.now();
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastInteractionTime.current = Date.now();
    // Re-enable auto-rotate after a delay
    setTimeout(() => {
      setAutoRotateEnabled(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (isDragging) {
      lastInteractionTime.current = Date.now();
      // Re-enable auto-rotate after a delay
      setTimeout(() => {
        setAutoRotateEnabled(true);
      }, 2000);
    }
  };

  // Determine which face is most visible
  useEffect(() => {
    const normalizedY = ((rotation.y % 360) + 360) % 360;
    const face = Math.round(normalizedY / 90) % 4;
    setCurrentFace(face);
  }, [rotation]);

  return (
    <motion.div
      className={`rounded-3xl p-6 md:p-8 border bg-[#111111] border-gray-800/50 h-[280px] relative group overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full filter blur-3xl"
          style={{
            background: `linear-gradient(135deg, ${faces[currentFace].color}30, transparent)`,
          }}
        />
      </div>

      {/* Label */}
      <div className={`absolute top-6 left-6 text-xs z-20 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        03 EXPERIENCE SNAPSHOT
      </div>

      {/* Instruction hint */}
      <div className={`absolute top-6 right-6 text-[10px] z-20 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        <div>DRAG TO ROTATE</div>
        <div className="text-[8px] mt-0.5 opacity-70">drag & release to "play"</div>
      </div>

      {/* 3D Cube Container */}
      <div className="relative z-10 h-full flex items-center justify-center pt-6">
        <div 
          ref={cubeRef}
          className="relative"
          style={{
            width: '160px',
            height: '160px',
            perspective: '1000px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {/* Front Face */}
            <CubeFace
              face={faces[0]}
              transform="rotateY(0deg) translateZ(80px)"
              theme={theme}
            />
            
            {/* Right Face */}
            <CubeFace
              face={faces[3]}
              transform="rotateY(90deg) translateZ(80px)"
              theme={theme}
            />
            
            {/* Back Face */}
            <CubeFace
              face={faces[2]}
              transform="rotateY(180deg) translateZ(80px)"
              theme={theme}
            />
            
            {/* Left Face */}
            <CubeFace
              face={faces[1]}
              transform="rotateY(270deg) translateZ(80px)"
              theme={theme}
            />
            
            {/* Top Face */}
            <CubeFace
              face={topFace}
              transform="rotateX(90deg) translateZ(80px)"
              theme={theme}
            />
            
            {/* Bottom Face */}
            <CubeFace
              face={bottomFace}
              transform="rotateX(-90deg) translateZ(80px)"
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Current face indicator - moved to bottom-left */}
      <div className={`absolute bottom-6 left-6 z-20`}>
        <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mb-1`}>
          CURRENT VIEW
        </div>
        <div 
          className="text-xs"
          style={{ color: faces[currentFace].color }}
        >
          {faces[currentFace].title}
        </div>
      </div>

      {/* Face navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
        {faces.map((face, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentFace 
                ? 'w-4' 
                : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
            }`}
            style={{
              backgroundColor: index === currentFace ? face.color : undefined,
            }}
            onClick={() => {
              setRotation({ x: -20, y: index * 90 + 20 });
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface CubeFaceProps {
  face: {
    title: string;
    icon: any;
    color: string;
    gradient: string;
    items: string[];
  };
  transform: string;
  theme: 'dark' | 'light';
}

function CubeFace({ face, transform, theme }: CubeFaceProps) {
  const Icon = face.icon;
  
  return (
    <div
      className={`absolute w-full h-full border ${
        theme === 'dark' ? 'bg-gray-900/90 border-gray-800/50' : 'bg-white/90 border-gray-200'
      } backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-3 overflow-hidden`}
      style={{
        transform,
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${face.gradient} opacity-5`}
      />
      
      {/* Icon */}
      <Icon 
        className="w-6 h-6 mb-2 relative z-10" 
        style={{ color: face.color }}
      />
      
      {/* Title */}
      <div 
        className="text-xs mb-2 relative z-10"
        style={{ color: face.color }}
      >
        {face.title}
      </div>
      
      {/* Items */}
      <div className="space-y-1 relative z-10 w-full">
        {face.items.map((item, index) => (
          <div
            key={index}
            className={`text-[9px] text-center px-2 py-0.5 rounded ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}