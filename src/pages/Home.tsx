import { motion } from 'motion/react';
import Aurora from '../components/Aurora';

interface HomeProps {
  theme: 'dark' | 'light';
  onNavigate: (page: string) => void;
}

export function Home({ theme, onNavigate }: HomeProps) {
  const stats = [
    { value: '15+', label: 'Projects Built' },
    { value: '5+', label: 'Years Experience' },
    { value: '10+', label: 'Technologies' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-x-0 top-0 h-[50vh] z-0">
          <Aurora
            colorStops={["#ff0080", "#8a5cff", "#ff6b9d", "#4d9eff"]}
            speed={1.0}
            blend={0.5}
            amplitude={1.0}
          />
        </div>

        {/* Top Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6"
        >
          <div className="text-xl md:text-2xl font-mono">Portfolio</div>
          <div className="flex gap-6 text-sm md:text-base">
            <button
              onClick={() => onNavigate('Dashboard')}
              className="text-gray-300 hover:text-[#4d9eff] transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('Projects')}
              className="text-gray-300 hover:text-[#4d9eff] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('About')}
              className="text-gray-300 hover:text-[#4d9eff] transition-colors"
            >
              About
            </button>
          </div>
        </motion.nav>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 py-12">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="text-sm md:text-base text-gray-400 mb-4 tracking-wide uppercase">
                  Full-Stack Developer
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-mono">
                  Hello I'm
                  <br />
                  <span 
                    className="group inline-block relative text-[#4d9eff] transition-colors duration-300 hover:text-black cursor-pointer" 
                    style={{ fontFamily: "'Righteous', sans-serif" }}
                  >
                    <span className="absolute inset-0 bg-[#ff0080] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-10 rounded-md" />
                    Zayd Alnuweiri
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                  Creating exceptional digital experiences through code.
                  Specializing in modern web applications and interactive interfaces.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <motion.button
                    onClick={() => onNavigate('Projects')}
                    className="group relative px-8 py-4 border-2 border-[#4d9eff] text-[#4d9eff] rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(77,158,255,0.5)] hover:border-[#00d4ff] hover:text-[#00d4ff]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4d9eff] to-[#00d4ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2 font-mono">
                      VIEW PROJECTS
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => onNavigate('Dashboard')}
                    className="group relative px-8 py-4 border-2 border-[#ff0080] text-[#ff0080] rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,0,128,0.5)] hover:border-[#ff6b9d] hover:text-[#ff6b9d]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff0080] to-[#ff6b9d] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2 font-mono">
                      BACK TO DASHBOARD
                      <span className="group-hover:translate-x-1 transition-transform duration-300">←</span>
                    </div>
                  </motion.button>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">📧</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">💼</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">🔗</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Column - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="flex justify-center items-center"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/5 backdrop-blur-sm border border-gray-700 flex items-center justify-center overflow-hidden">
                  {/* Placeholder - replace with actual image or component */}
                  <div className="text-8xl opacity-50">💻</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 px-6 md:px-12 pb-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-mono mb-2 text-[#4d9eff]">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative z-10 px-6 md:px-12 pb-16"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className="text-4xl">🎓</span>
              <h2 className="text-3xl md:text-4xl font-mono">Education</h2>
            </div>

            {/* Education Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* High School Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative bg-white/5 backdrop-blur-sm border border-gray-700 rounded-3xl p-6"
              >
                <h3 className="text-xl mb-2">High school certificate</h3>
                <div className="text-sm text-gray-400 mb-4 font-mono">
                  Aug 31, 2019 - Jun 14, 2022
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🎓</span>
                  <span className="text-2xl font-mono text-[#4d9eff]">98.5</span>
                </div>

                <p className="text-gray-300">
                  Gyunil Ireedui Complex - Honorary student
                </p>
              </motion.div>

              {/* Bachelor Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="relative bg-white/5 backdrop-blur-sm border border-gray-700 rounded-3xl p-6"
              >
                <h3 className="text-xl mb-2">Bachelor in Information Technology</h3>
                <div className="text-sm text-gray-400 mb-4 font-mono">
                  Aug 31, 2022 - Jun 14, 2026
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🎓</span>
                  <span className="text-2xl font-mono text-[#4d9eff]">3.7</span>
                </div>

                <p className="text-gray-300">
                  National University of Mongolia
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}