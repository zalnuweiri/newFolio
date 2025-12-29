import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Spiral from './Spiral';

export function LoadingScreen() {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 5;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
      }
      if (counterRef.current) {
        counterRef.current.textContent = count + '%';
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center relative">
        {/* Spiral Animation */}
        <motion.div
          className="w-[400px] h-[400px] mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Spiral
            totalDots={600}
            dotRadius={2}
            duration={3}
            backgroundColor="#000000"
            useMultipleColors={false}
            colors={[
              { color: '#ffffff' }, // white
            ]}
            minOpacity={0.3}
            maxOpacity={1}
            minScale={0.5}
            maxScale={1.5}
          />
        </motion.div>

        {/* Loading percentage */}
        <motion.div
          ref={counterRef}
          className="text-2xl text-gray-500 mt-32 absolute bottom-0 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          0%
        </motion.div>
      </div>
    </motion.div>
  );
}