import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialsProps {
  theme: 'dark' | 'light';
}

export function Testimonials({ theme }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechCorp',
      content: 'Michele\'s work exceeded all expectations. The attention to detail and creative solutions brought our vision to life perfectly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at StartupXYZ',
      content: 'Working with Michele was an absolute pleasure. The portfolio speaks for itself - truly world-class design and development.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director at DesignStudio',
      content: 'Michele has an incredible eye for design and the technical skills to bring ideas to life. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={`rounded-3xl p-8 md:p-12 border bg-[#111111] border-gray-800/50 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">What People Say</h2>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className={`text-xl md:text-2xl mb-8 italic ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                "{testimonials[activeIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-lg">{testimonials[activeIndex].name}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className={`w-12 h-12 rounded-full border ${
                theme === 'dark' ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              } flex items-center justify-center cursor-hover transition-all`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-white w-8'
                      : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className={`w-12 h-12 rounded-full border ${
                theme === 'dark' ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              } flex items-center justify-center cursor-hover transition-all`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}