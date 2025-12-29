import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import bgImage from 'figma:asset/c25ea3297f90ba97a686d0e9ef3fac7938388671.png';

interface HelloCardProps {
  theme: 'dark' | 'light';
}

export function HelloCard({ theme }: HelloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      } flex flex-col justify-between h-[280px] relative overflow-hidden group cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Scanline overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 3px
          )`,
        }}
      />

      {/* Diagonal scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />

      {/* Main Content */}
      <div className="relative z-10">
        <motion.h2 
          className={`text-4xl md:text-5xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello
        </motion.h2>
        <motion.h2 
          className={`text-4xl md:text-5xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stranger
        </motion.h2>
      </div>

      {/* Bottom Code Snippet */}
      <motion.div 
        className={`text-xs font-mono relative z-10 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-400'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p>let stranger = (user.connect() {'=>'} translate as open; Two</p>
        <p>reading; let mejore...</p>
      </motion.div>

      {/* Edge glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </motion.div>
  );
}