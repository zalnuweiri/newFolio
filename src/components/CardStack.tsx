import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardStack.css';

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  children: ReactNode;
  className?: string;
}

interface CardStackItemProps {
  children: ReactNode;
  className?: string;
}

export const CardStackItem = ({ children, className = '' }: CardStackItemProps) => (
  <div className={`card-stack-item ${className}`.trim()}>{children}</div>
);

const CardStack = ({ children, className = '' }: CardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.card-stack-item');
    
    cards.forEach((card, index) => {
      // Skip the last card - it doesn't need to pin
      if (index === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: card,
        start: 'top 20%',
        end: () => `+=${cards.length * 150}`,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1
      });

      // Scale down animation
      gsap.to(card, {
        scale: 0.9 - (index * 0.05),
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 20%',
          end: 'top 10%',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      // Subtle blur on stacked cards
      gsap.to(card, {
        filter: `blur(${index * 1}px)`,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[index + 1],
          start: 'top 30%',
          end: 'top 20%',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children]);

  return (
    <div ref={containerRef} className={`card-stack-container ${className}`.trim()}>
      {children}
      <div className="card-stack-spacer" />
    </div>
  );
};

export default CardStack;
