import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Zap, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  color: string;
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats: StatItem[] = [
    { icon: <Code2 className="w-8 h-8" />, value: 14238, label: 'Hours Coding', suffix: '+', color: 'from-cyan-400 to-blue-500' },
    { icon: <Palette className="w-8 h-8" />, value: 150, label: 'Projects Completed', suffix: '+', color: 'from-purple-400 to-pink-500' },
    { icon: <Zap className="w-8 h-8" />, value: 50, label: 'Technologies', suffix: '+', color: 'from-green-400 to-cyan-500' },
    { icon: <Trophy className="w-8 h-8" />, value: 25, label: 'Awards Won', suffix: '+', color: 'from-orange-400 to-red-500' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            const duration = 2;
            const startTime = Date.now();
            const endValue = stat.value;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / (duration * 1000), 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut cubic
              const currentValue = Math.floor(easeProgress * endValue);

              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = currentValue;
                return newCounts;
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="section py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-16 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          By The Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl`} />
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                  {stat.icon}
                </div>
                
                <div className={`text-4xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {counts[index].toLocaleString()}{stat.suffix}
                </div>
                
                <div className="text-gray-400">
                  {stat.label}
                </div>

                {/* Animated progress bar */}
                <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-2000 ease-out`}
                    style={{ width: `${(counts[index] / stat.value) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}