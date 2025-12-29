import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: 'AI-Powered Design System',
      description: 'A next-generation design system with AI-assisted component generation and real-time collaboration features.',
      tech: ['React', 'TypeScript', 'AI/ML', 'WebSocket'],
      gradient: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    },
    {
      title: 'Interactive 3D Portfolio',
      description: 'An immersive 3D web experience using Three.js and GSAP for smooth animations and transitions.',
      tech: ['Three.js', 'GSAP', 'WebGL', 'React'],
      gradient: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    },
    {
      title: 'Real-time Analytics Dashboard',
      description: 'A comprehensive analytics platform with live data visualization and predictive insights.',
      tech: ['Next.js', 'D3.js', 'GraphQL', 'PostgreSQL'],
      gradient: 'from-green-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution with headless CMS, payment integration, and personalized recommendations.',
      tech: ['Next.js', 'Stripe', 'Sanity', 'Tailwind'],
      gradient: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    },
    {
      title: 'Social Media App',
      description: 'A feature-rich social platform with real-time messaging, stories, and advanced content algorithms.',
      tech: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      gradient: 'from-pink-500 to-rose-600',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    },
    {
      title: 'AI Chat Interface',
      description: 'An intelligent conversational interface with natural language processing and context awareness.',
      tech: ['TypeScript', 'OpenAI', 'React', 'TailwindCSS'],
      gradient: 'from-indigo-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D perspective container
      gsap.set(projectsRef.current, {
        perspective: 1000,
      });

      // Stagger animation for project cards
      const cards = projectsRef.current?.querySelectorAll('.project-card');
      
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            rotateX: -15,
            z: -100,
          },
          {
            opacity: 1,
            rotateX: 0,
            z: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
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
    <div ref={sectionRef} className="section py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          A selection of my recent work showcasing innovation, creativity, and technical excellence
        </p>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card group relative"
              onHoverStart={() => setActiveProject(index)}
              onHoverEnd={() => setActiveProject(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 mix-blend-multiply`} />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated border gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 blur-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}
