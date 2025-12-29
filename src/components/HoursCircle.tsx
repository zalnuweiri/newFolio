import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface HoursCircleProps {
  theme: 'dark' | 'light';
}

interface Location {
  name: string;
  hours: number;
  color: string;
}

export function HoursCircle({ theme }: HoursCircleProps) {
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const animationRef = useRef<number>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const locations: Location[] = [
    { name: 'Home Office', hours: 5200, color: '#d946ef' },
    { name: 'Coffee Shop', hours: 3800, color: '#3b82f6' },
    { name: 'Co-working Space', hours: 2900, color: '#22d3ee' },
    { name: 'Library', hours: 1500, color: '#10b981' },
    { name: 'Campus Lab', hours: 838, color: '#f97316' },
  ];

  const totalHours = locations.reduce((sum, loc) => sum + loc.hours, 0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progressValue, 3);
      setProgress(eased);
      setCount(Math.floor(eased * totalHours));

      if (progressValue < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [totalHours]);

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

  const radius = 95;
  const circumference = 2 * Math.PI * radius;

  // Calculate segments for each location
  const getSegments = () => {
    let currentOffset = 0;
    return locations.map((location) => {
      const percentage = location.hours / totalHours;
      const segmentLength = percentage * circumference;
      const segment = {
        ...location,
        offset: currentOffset,
        length: segmentLength * progress,
        percentage,
      };
      currentOffset += segmentLength;
      return segment;
    });
  };

  const segments = getSegments();

  // Calculate legend positions around the top-right arc of the circle
  const getLegendPositions = () => {
    const centerX = 120; // SVG center
    const centerY = 120; // SVG center
    const legendRadius = 130; // Distance from center for legend items
    const yOffset = -236; // Shift upwards (lowered by 3%)
    
    // Start angle and spread for the legend items (top-right quadrant)
    // -90 degrees is top, 0 degrees is right
    const startAngle = -70; // Start slightly before top
    const endAngle = 10; // End slightly after right
    const angleRange = endAngle - startAngle;
    const angleStep = angleRange / (locations.length - 1);
    
    return locations.map((location, index) => {
      const angle = (startAngle + (angleStep * index)) * (Math.PI / 180);
      const baseX = centerX + legendRadius * Math.cos(angle);
      const baseY = centerY + legendRadius * Math.sin(angle) + yOffset;
      
      // Individual x-axis adjustments
      let xOffset = 0;
      let yOffset_individual = baseY * 0.03; // Move all items down by 3%
      
      if (index === 0) { // Home Office - move right and down
        xOffset = baseX * 0.10;
        yOffset_individual += 8; // Additional offset for Home Office
      } else if (index === 1) { // Coffee Shop - move right by 3%
        xOffset = baseX * 0.03;
      } else if (index >= 2) { // Co-working, Library, Campus - move left by 3%
        xOffset = -baseX * 0.03;
      }
      
      return {
        x: baseX + xOffset,
        y: baseY + yOffset_individual,
        location,
      };
    });
  };

  const legendPositions = getLegendPositions();

  return (
    <motion.div
      ref={cardRef}
      className={`rounded-3xl p-6 md:p-8 border ${
        theme === 'dark' ? 'bg-[#111111] border-gray-800/50' : 'bg-gray-50 border-gray-200'
      } flex flex-col items-center justify-center h-[280px] relative group cursor-pointer overflow-hidden`}
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30 rounded-full filter blur-3xl" />
      </div>

      {/* Label */}
      <div className={`absolute top-6 left-6 text-xs z-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        03 DESIGN TIME SPENT
      </div>

      {/* Circle */}
      <div className="relative flex items-center justify-center z-10">
        <svg width="240" height="240" className="transform -rotate-90" style={{ overflow: 'visible' }}>
          {/* Background track */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke={theme === 'dark' ? '#222222' : '#e5e7eb'}
            strokeWidth="6"
          />
          
          {/* Filters for glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Segmented progress arcs */}
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${segment.length} ${circumference - segment.length}`}
              strokeDashoffset={-segment.offset}
              filter="url(#glow)"
              style={{ transition: 'stroke-dasharray 0.3s ease, stroke-dashoffset 0.3s ease' }}
            />
          ))}
          
          {/* Legend items positioned around the arc */}
          <g className="transform rotate-90">
            {legendPositions.map((item, index) => {
              const angle = (-75 + (90 / (locations.length - 1)) * index);
              const isLeft = angle < -45;
              // Force Coffee Shop (index 1) to be on the right
              const shouldBeLeft = index === 1 ? false : isLeft;
              
              return (
                <g key={index}>
                  {/* Color indicator dot */}
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r="3"
                    fill={item.location.color}
                    className="transition-all duration-300"
                  />
                  
                  {/* Label text */}
                  <text
                    x={item.x + (shouldBeLeft ? -8 : 8)}
                    y={item.y}
                    textAnchor={shouldBeLeft ? 'end' : 'start'}
                    dominantBaseline="middle"
                    className={`text-[10px] transition-all duration-300 ${
                      theme === 'dark' ? 'fill-gray-500' : 'fill-gray-400'
                    }`}
                    style={{ 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      userSelect: 'none'
                    }}
                  >
                    {item.location.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Center text */}
        <div className="absolute text-center">
          <motion.div 
            className="text-5xl md:text-6xl mb-1"
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {count.toLocaleString()}
          </motion.div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>Hours</div>
        </div>
      </div>

      {/* Bottom location info */}
      <div className={`absolute bottom-6 left-4 right-4 flex justify-between text-xs z-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        <div className="text-left">
          <div>BOSTON</div>
          <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-700' : 'text-gray-500'}`}>2020 AT 71.0589° W</div>
        </div>
        <div className="text-right">
          <div>SAN FRANCISCO</div>
          <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-700' : 'text-gray-500'}`}>2025 AT 122.4194° W</div>
        </div>
      </div>
    </motion.div>
  );
}