import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projects, Project } from '../data/projects';

interface ProjectsGridProps {
  theme: 'dark' | 'light';
  onProjectClick: (project: Project) => void;
  onProjectsClick?: () => void;
}

export function ProjectsGrid({ theme, onProjectClick, onProjectsClick }: ProjectsGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleProjects = 2; // Reduced from 3 to 2 for smaller card
  const maxIndex = Math.max(0, projects.length - visibleProjects);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const getVisibleProjects = () => {
    return projects.slice(currentIndex, currentIndex + visibleProjects);
  };

  return (
    <div
      className={`rounded-3xl border p-4 bg-[#111111] border-gray-800/50 h-full relative overflow-hidden flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <motion.h3 
            className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} cursor-pointer hover:text-[#ff0080] transition-colors`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onProjectsClick}
            whileHover={{ scale: 1.02 }}
          >
            Projects
          </motion.h3>
          <motion.p 
            className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {projects.length} projects
          </motion.p>
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-1.5">
          <motion.button
            onClick={() => paginate(-1)}
            className={`p-1.5 rounded-full border ${
              theme === 'dark' 
                ? 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white' 
                : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-black'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className={`p-1.5 rounded-full border ${
              theme === 'dark' 
                ? 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white' 
                : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-black'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Cards container */}
      <div className="flex-1 relative min-h-0">
        <div className="absolute inset-0 flex gap-2.5">
          <AnimatePresence initial={false} custom={direction}>
            {getVisibleProjects().map((project, index) => (
              <motion.div
                key={project.id}
                className="flex-1 min-w-0"
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className={`relative h-full rounded-xl overflow-hidden border cursor-pointer group flex flex-col ${
                    theme === 'dark' 
                      ? 'bg-[#0a0a0a] border-gray-800/50 hover:border-gray-700' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onProjectClick(project)}
                >
                  {/* Image */}
                  <div className="h-24 overflow-hidden relative flex-shrink-0">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="bg-white text-black p-2 rounded-full"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2.5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-1.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {project.category}
                      </span>
                      <span className={`text-[9px] ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {project.year}
                      </span>
                    </div>
                    
                    <h4 className={`text-xs mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'} line-clamp-1`}>
                      {project.title}
                    </h4>
                    
                    <p className={`text-[10px] leading-tight ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} line-clamp-2`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 ' + (theme === 'dark' ? 'bg-white' : 'bg-black')
                : 'w-1 ' + (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300')
            }`}
          />
        ))}
      </div>
    </div>
  );
}