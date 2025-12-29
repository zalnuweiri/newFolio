import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Moon, Music, Zap, Code2, Sparkles } from 'lucide-react';

interface CreativeFuelTrackerProps {
  theme: 'dark' | 'light';
}

interface FuelMetric {
  label: string;
  value: number;
  unit: string;
  icon: any;
  color: string;
  gradient: string;
}

export function CreativeFuelTracker({ theme }: CreativeFuelTrackerProps) {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const metrics: FuelMetric[] = [
    {
      label: 'Cups of Coffee',
      value: 2847,
      unit: 'cups',
      icon: Coffee,
      color: '#8B4513',
      gradient: 'from-amber-600 to-orange-700',
    },
    {
      label: 'Late Night Sessions',
      value: 437,
      unit: 'nights',
      icon: Moon,
      color: '#4169E1',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      label: 'Spotify Hours',
      value: 1256,
      unit: 'hours',
      icon: Music,
      color: '#1DB954',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Lines of Code',
      value: 89432,
      unit: 'lines',
      icon: Code2,
      color: '#00D9FF',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(metrics.map(metric => Math.floor(metric.value * eased)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`rounded-3xl p-6 md:p-8 border ${
        theme === 'dark' ? 'bg-[#111111] border-gray-800/50' : 'bg-gray-50 border-gray-200'
      } h-[280px] relative group cursor-pointer overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-cyan-500/20 rounded-full filter blur-3xl" />
      </div>

      {/* Label */}
      <div className={`absolute top-6 left-6 text-xs z-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        03 CREATIVE FUEL
      </div>

      {/* Sparkle icon */}
      <div className="absolute top-6 right-6 z-10">
        <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
      </div>

      {/* Metrics Grid */}
      <div className="relative z-10 h-full flex items-center justify-center pt-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/50'
                } backdrop-blur-sm border ${
                  theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200/50'
                } relative overflow-hidden group/metric`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover/metric:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  className="mb-2"
                  animate={{
                    rotate: [0, 0, 0],
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: metric.color }}
                  />
                </motion.div>

                {/* Counter */}
                <div 
                  className="text-2xl mb-1 transition-colors"
                  style={{ 
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                  }}
                >
                  {counts[index].toLocaleString()}
                </div>

                {/* Label */}
                <div className={`text-[10px] text-center leading-tight ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {metric.label}
                </div>

                {/* Animated pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    border: `2px solid ${metric.color}`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className={`absolute bottom-6 left-0 right-0 text-center text-xs z-10 ${
        theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
      }`}>
        Powered by passion & caffeine
      </div>
    </motion.div>
  );
}
