import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  theme: 'dark' | 'light';
  onViewFullProject?: (projectId: number) => void;
}

export function ProjectModal({ project, onClose, theme, onViewFullProject }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111111] border border-gray-800 shadow-2xl`}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-hover z-10"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
            <img
              src={project.modalImage || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl md:text-4xl mb-4">{project.title || 'Project Title'}</h2>
            
            <div className="flex gap-4 mb-6">
              <button className="px-6 py-2 bg-white text-black rounded-full cursor-hover flex items-center gap-2 hover:shadow-lg transition-all">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
              <button className="px-6 py-2 border border-gray-700 rounded-full cursor-hover flex items-center gap-2 hover:border-white transition-all">
                <Github className="w-4 h-4" />
                Source Code
              </button>
            </div>

            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              This project showcases innovative design and development techniques, combining user-centric design with cutting-edge technology to create an exceptional digital experience.
            </p>

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>ROLE</h3>
                <p className="text-lg">Lead Designer & Developer</p>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>TIMELINE</h3>
                <p className="text-lg">3 months</p>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['React', 'TypeScript', 'Tailwind', 'GSAP'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>ACHIEVEMENTS</h3>
                <p className="text-lg">Featured on Awwwards</p>
              </div>
            </div>

            {/* Case study sections */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl mb-4">Challenge</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  The main challenge was creating an interface that was both visually stunning and highly functional, while maintaining optimal performance across all devices.
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-4">Solution</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  We implemented a component-based architecture with advanced animations and micro-interactions, ensuring a smooth and engaging user experience throughout.
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-4">Results</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className="text-3xl mb-2">150%</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Engagement Increase</div>
                  </div>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className="text-3xl mb-2">45%</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Faster Load Time</div>
                  </div>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className="text-3xl mb-2">98%</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>User Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Full Project Button */}
            {onViewFullProject && (
              <button
                className="mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full cursor-hover flex items-center gap-2 transition-all"
                onClick={() => onViewFullProject(project.id)}
              >
                <ArrowRight className="w-4 h-4" />
                View Full Project
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}