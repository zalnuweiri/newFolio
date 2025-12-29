import { useCallback, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from 'motion/react';

interface AnimatedThemeTogglerProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  duration?: number;
}

export function AnimatedThemeToggler({
  theme,
  onToggle,
  duration = 400,
}: AnimatedThemeTogglerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      onToggle();
      return;
    }

    // Start the view transition
    const transition = document.startViewTransition(() => {
      onToggle();
    });

    await transition.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [onToggle, duration]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg cursor-hover"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Moon className="w-6 h-6 text-white" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
