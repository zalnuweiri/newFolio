import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'React & Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'GSAP & Animations', level: 85, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'GraphQL', level: 75, category: 'Backend' },
    { name: 'UI/UX Design', level: 88, category: 'Design' },
    { name: 'Figma', level: 92, category: 'Design' },
    { name: '3D (Three.js)', level: 70, category: 'Advanced' },
    { name: 'WebGL', level: 65, category: 'Advanced' },
  ];

  const categories = ['Frontend', 'Backend', 'Design', 'Advanced'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = skillsRef.current?.querySelectorAll('.skill-bar');
      
      bars?.forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${skills[index].level}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Parallax effect for skill cards
      const skillCards = skillsRef.current?.querySelectorAll('.skill-item');
      skillCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="section py-24 px-4 relative bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          A comprehensive toolkit built through years of continuous learning and real-world application
        </p>

        {/* Gradient bar visualization */}
        <div className="mb-16 h-2 rounded-full overflow-hidden bg-gray-800">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-500 animate-pulse" />
        </div>

        <div ref={skillsRef} className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <h3 className="text-2xl text-gray-300 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div
                      key={skill.name}
                      className="skill-item group"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="skill-bar absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"
                          style={{ width: '0%' }}
                        />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shimmer" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack cloud */}
        <div className="mt-16 pt-16 border-t border-gray-800">
          <h3 className="text-2xl text-center mb-8 text-gray-300">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Figma', 'Tailwind', 'Next.js', 'GSAP', 'Three.js', 'WebGL'].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-cyan-500 transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
