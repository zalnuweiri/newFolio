import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click'>('default');
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device has mouse
    const hasTouch = 'ontouchstart' in window;
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setCursorState('click');
    const handleMouseUp = () => setCursorState('default');

    // Detect hoverable elements
    const handleMouseEnter = () => setCursorState('hover');
    const handleMouseLeave = () => setCursorState('default');

    const hoverElements = document.querySelectorAll('a, button, .cursor-hover');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop for smooth cursor
    const animate = () => {
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      cursorPosition.current.x += dx * 0.15;
      cursorPosition.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="w-10 h-10 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: cursorState === 'hover' ? 1.5 : cursorState === 'click' ? 0.8 : 1,
            opacity: cursorState === 'hover' ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: cursorState === 'click' ? 0.5 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  );
}
