import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import CountUp from './CountUp';

interface SkillMatrixProps {
  theme: 'dark' | 'light';
}

export function SkillMatrix({ theme }: SkillMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);

  const skills = [
    { name: 'Platform Design', level: 95, checked: true, years: 8 },
    { name: 'UI UX Design', level: 92, checked: true, years: 7 },
    { name: 'Interaction Design', level: 88, checked: true, years: 6 },
    { name: 'Website Design', level: 85, checked: true, years: 9 },
    { name: 'User Research', level: 78, checked: true, years: 5 },
    { name: 'Usability Testing', level: 75, checked: true, years: 4 },
    { name: 'Front-end Development', level: 82, checked: true, years: 6 },
    { name: 'Prototyping', level: 90, checked: true, years: 7 },
    { name: 'Data Visualization', level: 70, checked: true, years: 3 },
    { name: 'Design System', level: 88, checked: true, years: 5 },
  ];

  const tools = [
    { name: 'Figma', percentage: 100 },
    { name: 'Photoshop', percentage: 85 },
    { name: 'Framer', percentage: 78 },
    { name: 'Sketch', percentage: 70 },
    { name: 'Illustrator', percentage: 82 },
    { name: 'HTML', percentage: 88 },
    { name: 'CSS', percentage: 90 },
    { name: 'Adobe CC', percentage: 75 },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    let progress = 0;
    const animationDuration = 2000;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      progress = Math.min(elapsed / animationDuration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, width, height);
      
      // Create gradient for the line
      const gradient = ctx.createLinearGradient(0, height, width, 0);
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#eab308');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw curved line through skill levels
      ctx.beginPath();
      const visibleSkills = Math.floor(eased * skills.length);
      
      skills.slice(0, visibleSkills + 1).forEach((skill, index) => {
        const x = (index / (skills.length - 1)) * width;
        const y = height - (skill.level / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw points on the line
      skills.slice(0, visibleSkills + 1).forEach((skill, index) => {
        const x = (index / (skills.length - 1)) * width;
        const y = height - (skill.level / 100) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Glow effect on last point
        if (index === visibleSkills) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

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

  // Generate rainbow spectrum bars
  const spectrumBars = Array.from({ length: 80 }, (_, i) => {
    const hue = (i / 80) * 360;
    return `hsl(${hue}, 80%, 60%)`;
  });

  return (
    <motion.div
      ref={cardRef}
      className={`rounded-3xl p-4 md:p-6 border bg-[#111111] border-gray-800/50 h-[280px] relative flex flex-col group cursor-pointer overflow-hidden`}
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
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full filter blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
        <div className="text-xs text-gray-600">04 CASE STUDY</div>
        <div className="hidden md:flex gap-8 text-xs">
          <div className="text-gray-600">YEARS</div>
          <div className="text-gray-600">TOOL</div>
        </div>
      </div>

      {/* Main content area with skills and graph */}
      <div className="flex-1 relative mb-3 overflow-hidden">
        {/* Skills list (left side) */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 flex flex-col justify-between z-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredSkillIndex(index)}
              onMouseLeave={() => setHoveredSkillIndex(null)}
            >
              <span className="text-[10px] md:text-xs text-gray-400 truncate hover:text-white transition-colors">
                {skill.name}
              </span>
              {skill.checked && (
                <div className="w-3 h-3 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2 h-2 text-gray-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Years column (middle) */}
        <div className="absolute left-38 md:left-56 top-0 bottom-0 w-12 md:w-16 flex flex-col justify-between text-left z-10 pl-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="text-[10px] md:text-xs overflow-visible"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.div 
                className={hoveredSkillIndex === index ? 'text-white' : 'text-gray-600'}
                animate={{
                  scale: hoveredSkillIndex === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', transformOrigin: 'left center' }}
              >
                {hoveredSkillIndex === index ? (
                  <>
                    <CountUp 
                      from={0} 
                      to={skill.years} 
                      duration={0.6}
                      startWhen={true}
                    />
                    y
                  </>
                ) : (
                  `${skill.years}y`
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tools percentages (right side) */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 flex flex-col justify-between text-right z-10">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="text-[10px] md:text-xs overflow-visible"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.div 
                className={hoveredSkillIndex === index ? 'text-white' : 'text-gray-600'}
                animate={{
                  scale: hoveredSkillIndex === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', transformOrigin: 'right center' }}
              >
                {hoveredSkillIndex === index ? (
                  <>
                    <CountUp 
                      from={0} 
                      to={tool.percentage} 
                      duration={0.6}
                      startWhen={true}
                    />
                    %
                  </>
                ) : (
                  `${tool.percentage}%`
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rainbow spectrum bar */}
      <motion.div
        className="flex gap-[1px] h-4 md:h-5 mb-2 rounded overflow-hidden relative z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {spectrumBars.map((color, index) => (
          <div
            key={index}
            className="flex-1 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: color,
              height: index % 3 === 0 ? '100%' : index % 2 === 0 ? '80%' : '60%',
            }}
          />
        ))}
      </motion.div>

      {/* Footer text */}
      <div className="text-[10px] md:text-xs text-gray-700 text-right relative z-10">
        // All Skills are self-assessed based + MBT
      </div>
    </motion.div>
  );
}