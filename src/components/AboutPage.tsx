import { motion } from 'motion/react';
import ColorBends from './ColorBends';
import { User, Code, Heart, Zap, Award, Coffee, Briefcase, Calendar, MapPin, GraduationCap, Layers, Database, Terminal, Palette, Download, Mail, Linkedin, Github, ExternalLink, TrendingUp, Target, BookOpen } from 'lucide-react';
import React from 'react';
import profileImage from 'figma:asset/1b614c1c36fe408dce982a8e7d6847c05e2614ac.png';
import dalShield from 'figma:asset/7a3b34109acfde89359d9edb240579b0309ff09f.png';
import { CompactAudioPlayer } from './CompactAudioPlayer';

interface AboutPageProps {
  theme: 'light' | 'dark';
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function AboutPage({ theme, onBack, onNavigate }: AboutPageProps) {
  const homeStats = [
    { value: '15+', label: 'Projects Built' },
    { value: '5+', label: 'Years Experience' },
    { value: '10+', label: 'Technologies' },
  ];

  const quickFacts = [
    { icon: MapPin, label: 'Location', value: 'Halifax, NS' },
    { icon: Briefcase, label: 'Availability', value: 'Open to Opportunities' },
    { icon: Mail, label: 'Email', value: 'zayd@example.com', link: 'mailto:zayd@example.com' },
    { icon: Linkedin, label: 'LinkedIn', value: '/zaydalnuweiri', link: '#' },
    { icon: Github, label: 'GitHub', value: '/zaydalnuweiri', link: '#' },
  ];

  const techStack = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Motion', 'Redux', 'React Query'],
    backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Postman', 'CI/CD'],
  };

  const keyAchievements = [
    { metric: '60%', description: 'Performance improvement' },
    { metric: '0.8s', description: 'Page load time' },
    { metric: '50K+', description: 'Active users' },
    { metric: '99.9%', description: 'Uptime' },
  ];

  const currently = {
    working: 'Building scalable web applications with React and TypeScript',
    learning: 'WebGL, Three.js, and advanced animation techniques',
    exploring: 'AI/ML integration in web applications',
    openTo: 'Full-time roles, contract work, and exciting collaborations'
  };

  const experience = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Startup Inc.',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Led development of modern web applications using React, TypeScript, and Node.js. Mentored junior developers and established coding standards.',
      highlights: ['Built 10+ production apps', 'Improved performance by 40%', 'Led team of 5 developers']
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Agency',
      location: 'Halifax, NS',
      period: '2021 - 2023',
      description: 'Developed responsive websites and interactive experiences for clients. Specialized in animation and creative coding.',
      highlights: ['Delivered 25+ client projects', 'Implemented GSAP animations', 'A/B testing improved conversions']
    },
    {
      title: 'Junior Developer',
      company: 'Software Solutions Ltd.',
      location: 'Halifax, NS',
      period: '2020 - 2021',
      description: 'Built UI components and contributed to full-stack features. Collaborated with design and backend teams.',
      highlights: ['Shipped 15+ features', 'Reduced bugs by 30%', 'Built component library']
    },
  ];

  const interests = [
    'UI/UX Design',
    'Web Development',
    'Creative Coding',
    'Motion Design',
    'Typography',
    '3D Graphics',
    'Generative Art',
    'System Design'
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with ColorBends Background */}
      <section className={`relative h-screen w-full overflow-hidden ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }`}>
        {/* ColorBends Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <ColorBends
            rotation={180}
            speed={0.2}
            transparent={true}
            scale={0.7}
            frequency={1}
            warpStrength={0}
            mouseInfluence={0}
            parallax={0}
            noise={0.15}
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 flex h-full items-center px-6 md:px-12 py-12" style={{ pointerEvents: 'none' }}>
          <div className="max-w-7xl w-full mx-auto" style={{ pointerEvents: 'auto' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className={`text-sm md:text-base mb-4 tracking-wide uppercase ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Full-Stack Developer
                </div>

                <h1 className={`text-4xl md:text-6xl lg:text-7xl mb-6 font-mono ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
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

                <p className={`text-lg md:text-xl mb-8 max-w-xl leading-relaxed ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}
                  style={theme === 'light'
                    ? { textShadow: '0 2px 12px rgba(255, 255, 255, 0.9), 0 1px 6px rgba(255, 255, 255, 0.95)' }
                    : { textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 6px rgba(0, 0, 0, 0.95)' }
                  }
                >
                  Creating exceptional digital experiences through code.
                  Specializing in modern web applications and interactive interfaces.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <motion.button
                    onClick={() => onNavigate?.('Projects')}
                    className="group relative px-8 py-4 border-2 border-[#4d9eff] text-[#4d9eff] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#4d9eff] hover:text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center gap-2 font-mono">
                      VIEW PROJECTS
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={onBack}
                    className="group relative px-8 py-4 border-2 border-[#ff0080] text-[#ff0080] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#ff0080] hover:text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
                    className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                      theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                      theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                      theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
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
                <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full backdrop-blur-sm border flex items-center justify-center overflow-hidden ${ 
                  theme === 'light'
                    ? 'bg-black/5 border-gray-300'
                    : 'bg-white/5 border-gray-700'
                }`}>
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <div className={`grid grid-cols-3 gap-8 border-t pt-8 ${
                theme === 'light' ? 'border-black/10' : 'border-white/10'
              }`}>
                {homeStats.map((stat, index) => (
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
                    <div className={`text-sm md:text-base uppercase tracking-wide ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Box Main Content */}
      <section 
        className={`w-full py-12 px-4 md:px-8 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="group inline-block relative text-4xl md:text-5xl lg:text-6xl cursor-pointer overflow-visible"
              style={{ fontFamily: "'Righteous', sans-serif" }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block text-[#4d9eff] transition-all duration-300 group-hover:text-[#ff0080] group-hover:tracking-wider">
                Quick Summary
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#4d9eff] group-hover:w-full transition-all duration-500 rounded-full" />
              </span>
            </motion.h2>
            
            <motion.a
              href="#"
              download
              className="flex items-center gap-2 px-6 py-3 bg-[#4d9eff] text-white rounded-lg hover:bg-[#3d8eef] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </motion.a>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
            
            {/* Quick Facts - spans 2 columns */}
            <motion.div
              className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-xl">Quick Facts</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-2">
                    <fact.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">{fact.label}</div>
                      {fact.link ? (
                        <a href={fact.link} className="text-sm text-[#4d9eff] hover:underline truncate block">
                          {fact.value}
                        </a>
                      ) : (
                        <div className="text-sm truncate">{fact.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Achievements - spans 2 columns */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-r from-[#4d9eff]/10 to-[#ff0080]/10 border border-[#4d9eff]/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-xl">Key Impact</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {keyAchievements.map((achievement) => (
                  <div key={achievement.description} className="text-center">
                    <div className="text-3xl text-[#4d9eff] font-mono mb-1">
                      {achievement.metric}
                    </div>
                    <div className="text-xs text-gray-400 leading-tight">
                      {achievement.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Professional Summary - spans 2 columns, 2 rows */}
            <motion.div
              className="lg:col-span-2 lg:row-span-2 bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-xl">Summary</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Full-stack developer with 5+ years of experience building scalable web applications and interactive user experiences. Specialized in React, TypeScript, and modern JavaScript ecosystem with a strong focus on performance, accessibility, and design excellence.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Proven track record of delivering high-quality products in fast-paced environments, leading development teams, and translating complex business requirements into elegant technical solutions.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              className="lg:col-span-2 relative bg-[#242424] rounded-2xl p-6 text-white overflow-hidden border border-[#FFD400]/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(255, 212, 0, 0.2)' }}
            >
              {/* Gold diagonal racing stripes bisecting top-left corner */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                {/* First stripe - from left edge to top edge */}
                <line x1="0" y1="30" x2="30" y2="0" stroke="#FFD400" strokeWidth="2" />
                {/* Second stripe - from left edge to top edge */}
                <line x1="0" y1="40" x2="40" y2="0" stroke="#FFD400" strokeWidth="2" />
              </svg>

              {/* Dalhousie Shield Logo */}
              <div className="absolute z-10" style={{ left: 'calc(1rem + 1%)', top: 'calc(1rem + 5%)' }}>
                <img 
                  src={dalShield} 
                  alt="Dalhousie Shield" 
                  className="w-16 h-16 opacity-80"
                />
              </div>

              {/* Content */}
              <div className="mt-20">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#FFD400]" />
                  <h3 className="text-lg text-[#FFD400]">Education</h3>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">Dalhousie University</div>
                  <div className="text-sm text-gray-500">Bachelor of Computer Science</div>
                  <div className="text-sm text-[#FFD400] mt-1">2022 - 2025</div>
                </div>
              </div>

              {/* Subtle gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD400]/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* Tech Stack - Frontend */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.frontend.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack - Backend */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.backend.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack - Tools */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.tools.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Currently - Working On */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Working On</h3>
              </div>
              <p className="text-gray-300 text-sm">{currently.working}</p>
            </motion.div>

            {/* Currently - Learning */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Learning</h3>
              </div>
              <p className="text-gray-300 text-sm">{currently.learning}</p>
            </motion.div>

            {/* Currently - Exploring */}
            <motion.div
              className="bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Exploring</h3>
              </div>
              <p className="text-gray-300 text-sm">{currently.exploring}</p>
            </motion.div>

            {/* Interests - Full width */}
            <motion.div
              className="lg:col-span-4 bg-[#111111] rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-[#4d9eff]" />
                <h3 className="text-lg">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 text-sm rounded-full border border-white/20 bg-white/5"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audio Visualizer Section */}
      <section 
        className={`w-full py-12 px-4 md:px-8 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.h2
            className="group inline-block relative text-4xl md:text-5xl lg:text-6xl cursor-pointer overflow-visible mb-8"
            style={{ fontFamily: "'Righteous', sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="relative inline-block text-[#4d9eff] transition-all duration-300 group-hover:text-[#ff0080] group-hover:tracking-wider">
              What I'm Listening to Nowadays
              <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#4d9eff] group-hover:w-full transition-all duration-500 rounded-full" />
            </span>
          </motion.h2>

          <motion.div
            className="rounded-3xl p-6 md:p-8 border bg-[#111111] border-gray-800/50 relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -3 }}
          >
            {/* Section Label */}
            <div className="absolute top-6 left-6 text-xs text-gray-600 z-10">
              05 AUDIO VISUALIZER
            </div>
            
            <CompactAudioPlayer />
          </motion.div>
        </div>
      </section>

      {/* Work Experience Timeline - Compact */}
      <section 
        id="experience"
        className={`w-full py-12 px-4 md:px-8 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6">Work Experience</h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <motion.div
                  key={job.title}
                  className="bg-[#111111] rounded-xl p-6 text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl mb-1">{job.title}</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-gray-400">
                        <span>{job.company}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mt-1 md:mt-0">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                      >
                        • {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`w-full py-32 px-4 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Create Together
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm always open to new opportunities and collaborations
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className={`px-12 py-5 rounded-full transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
            <motion.button
              className={`px-12 py-5 bg-transparent border-2 rounded-full transition-all duration-300 ${
                theme === 'light'
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-black'
              }`}
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}