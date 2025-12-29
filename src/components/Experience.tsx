import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      company: 'Tech Innovations Inc.',
      role: 'Senior Frontend Developer',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading the development of next-generation web applications using cutting-edge technologies.',
      achievements: [
        'Architected and deployed 15+ production applications',
        'Improved app performance by 60% through optimization',
        'Mentored team of 5 junior developers',
      ],
    },
    {
      company: 'Creative Digital Studio',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      location: 'New York, NY',
      description: 'Developed full-stack solutions for high-profile clients across various industries.',
      achievements: [
        'Built responsive web apps serving 1M+ users',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Led migration to microservices architecture',
      ],
    },
    {
      company: 'Startup Ventures',
      role: 'Frontend Developer',
      period: '2018 - 2020',
      location: 'Austin, TX',
      description: 'Created engaging user interfaces and experiences for startup products.',
      achievements: [
        'Developed MVP that secured $2M in funding',
        'Established design system used across 10+ products',
        'Increased conversion rate by 45% through UX improvements',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      // Animate timeline line
      const line = timelineRef.current?.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="section py-24 px-4 relative bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Experience
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          My professional journey building innovative digital solutions
        </p>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 timeline-line origin-top" />

          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="inline-block bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 text-sm">{exp.period}</span>
                    </div>

                    <h3 className="text-xl mb-1 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-2 mb-3 text-gray-400" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-500 text-sm flex items-start gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                          <span className="text-cyan-400 mt-1">•</span>
                          <span className={index % 2 === 0 ? 'text-right' : 'text-left'}>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-black z-10 group-hover:scale-125 transition-transform duration-300" />

                {/* Empty space */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Download resume */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gray-900 border border-gray-700 rounded-full hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}
