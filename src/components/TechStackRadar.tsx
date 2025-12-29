import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TechStackRadarProps {
  theme: 'dark' | 'light';
}

interface Skill {
  name: string;
  proficiency: number; // 0-100
  color: string;
  category: string;
}

export function TechStackRadar({ theme }: TechStackRadarProps) {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skills: Skill[] = [
    { name: 'React', proficiency: 95, color: '#61dafb', category: 'Frontend' },
    { name: 'TypeScript', proficiency: 90, color: '#3178c6', category: 'Languages' },
    { name: 'Figma', proficiency: 92, color: '#f24e1e', category: 'Design' },
    { name: 'Node.js', proficiency: 85, color: '#339933', category: 'Backend' },
    { name: 'UI/UX', proficiency: 88, color: '#d946ef', category: 'Design' },
    { name: 'GSAP', proficiency: 82, color: '#88ce02', category: 'Animation' },
    { name: 'Tailwind', proficiency: 93, color: '#06b6d4', category: 'CSS' },
    { name: 'Git', proficiency: 87, color: '#f05032', category: 'Tools' },
  ];

  useEffect(() => {
    let startTime: number;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progressValue, 3);
      setProgress(eased);

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
    setHoveredSkill(null);
  };

  // Calculate radar chart points
  const centerX = 140;
  const centerY = 140;
  const maxRadius = 100;
  const levels = 5; // Number of concentric circles

  const getRadarPoints = () => {
    const angleStep = (2 * Math.PI) / skills.length;
    return skills.map((skill, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const radius = (skill.proficiency / 100) * maxRadius * progress;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, skill, index, angle, radius };
    });
  };

  const points = getRadarPoints();
  const pathData = points.length > 0 
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`
    : '';

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const radius = maxRadius * ((i + 1) / levels);
    return radius;
  });

  // Generate axis lines
  const axisLines = skills.map((_, index) => {
    const angle = index * (2 * Math.PI / skills.length) - Math.PI / 2;
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);
    return { x, y, angle };
  });

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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl" />
      </div>

      {/* Label */}
      <div className={`absolute top-6 left-6 text-xs z-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        03 TECH STACK PROFICIENCY
      </div>

      {/* Radar Chart */}
      <div className="relative flex items-center justify-center z-10">
        <svg width="280" height="280" className="overflow-visible">
          {/* Filters for glow effect */}
          <defs>
            <filter id="radar-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="radar-gradient">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* Background level circles */}
          {levelCircles.map((radius, index) => (
            <circle
              key={`level-${index}`}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={theme === 'dark' ? '#222222' : '#e5e7eb'}
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, index) => (
            <line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={line.x}
              y2={line.y}
              stroke={theme === 'dark' ? '#222222' : '#e5e7eb'}
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          {/* Filled area */}
          {progress > 0 && (
            <path
              d={pathData}
              fill="url(#radar-gradient)"
              stroke="#3b82f6"
              strokeWidth="2"
              filter="url(#radar-glow)"
              opacity={0.6}
            />
          )}

          {/* Data points */}
          {points.map((point, index) => {
            const isHovered = hoveredSkill === index;
            const labelDistance = maxRadius + 25;
            const labelAngle = point.angle;
            const labelX = centerX + labelDistance * Math.cos(labelAngle);
            const labelY = centerY + labelDistance * Math.sin(labelAngle);
            
            // Determine text anchor based on position
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (labelX < centerX - 10) textAnchor = 'end';
            else if (labelX > centerX + 10) textAnchor = 'start';

            return (
              <g key={index}>
                {/* Connecting line from center to point (subtle) */}
                {isHovered && (
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={point.x}
                    y2={point.y}
                    stroke={point.skill.color}
                    strokeWidth="2"
                    opacity={0.5}
                    className="transition-all duration-300"
                  />
                )}
                
                {/* Data point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 6 : 4}
                  fill={point.skill.color}
                  filter="url(#radar-glow)"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                />
                
                {/* Outer ring on hover */}
                {isHovered && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={10}
                    fill="none"
                    stroke={point.skill.color}
                    strokeWidth="2"
                    opacity={0.5}
                  />
                )}

                {/* Skill label */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  className={`text-[10px] transition-all duration-300 ${
                    isHovered 
                      ? (theme === 'dark' ? 'fill-white' : 'fill-black')
                      : (theme === 'dark' ? 'fill-gray-500' : 'fill-gray-400')
                  }`}
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    userSelect: 'none',
                    fontWeight: isHovered ? 600 : 400,
                  }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="cursor-pointer"
                >
                  {point.skill.name}
                </text>

                {/* Proficiency percentage on hover */}
                {isHovered && (
                  <text
                    x={labelX}
                    y={labelY + 12}
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                    className={`text-[9px] ${theme === 'dark' ? 'fill-gray-400' : 'fill-gray-500'}`}
                    style={{ 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      userSelect: 'none',
                    }}
                  >
                    {point.skill.proficiency}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Average proficiency indicator */}
      <div className={`absolute bottom-6 left-0 right-0 text-center text-xs z-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        <div>
          AVERAGE PROFICIENCY
        </div>
        <div className="text-lg mt-1" style={{ color: '#3b82f6' }}>
          {Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length * progress)}%
        </div>
      </div>
    </motion.div>
  );
}
