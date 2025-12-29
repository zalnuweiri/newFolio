import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.textContent || '';
      textRef.current.innerHTML = text
        .split('')
        .map((char, i) => `<span class="char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      gsap.fromTo(
        '.char',
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }
  }, []);

  const scrollToContent = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative max-w-[1600px] mx-auto">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="text-center z-10 px-4">
        <motion.div
          className="text-xs tracking-widest text-gray-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          PORTFOLIO 2025
        </motion.div>

        <h1
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-9xl mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          Michele Du
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          Product Designer & Creative Developer crafting memorable digital experiences
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <button className="px-8 py-4 bg-white text-black rounded-full cursor-hover hover:shadow-lg hover:shadow-white/20 transition-all">
            View Projects
          </button>
          <button className="px-8 py-4 border border-gray-700 rounded-full cursor-hover hover:border-white transition-all">
            Download Resume
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer cursor-hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, y: { duration: 1.5, repeat: Infinity } }}
          onClick={scrollToContent}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </div>
    </div>
  );
}
