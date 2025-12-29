import { motion } from 'motion/react';
// import GradientBlinds from './GradientBlinds'; // bg1 - saved
import FaultyTerminal from './FaultyTerminal';
import { projects, Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { Play, ArrowUpRight } from 'lucide-react';

interface ProjectsPageProps {
  theme: 'light' | 'dark';
  onBack: () => void;
  scrollToProjectId?: number | null;
}

export function ProjectsPage({ theme, onBack, scrollToProjectId }: ProjectsPageProps) {
  console.log('ProjectsPage rendering'); // Debug log
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(null);
  const [pauseTerminal, setPauseTerminal] = React.useState(false);
  const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const heroRef = React.useRef<HTMLDivElement>(null);

  // Scroll to project when scrollToProjectId changes
  React.useEffect(() => {
    if (scrollToProjectId) {
      const timer = setTimeout(() => {
        const projectElement = document.getElementById(`project-${scrollToProjectId}`);
        if (projectElement) {
          projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scrollToProjectId]);

  // Pause terminal animation when user scrolls past the hero
  React.useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
          // If hero is in view, unpause. If not in view, pause.
          setPauseTerminal(!entry.isIntersecting);
        },
        {
          threshold: 0.1, // Trigger when at least 10% of hero is visible
          rootMargin: '0px'
        }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: "E-Commerce Platform Redesign",
      subtitle: "Transforming Digital Shopping Experience",
      description: "Led a complete overhaul of a major e-commerce platform, focusing on user journey optimization, mobile-first design, and accessibility improvements. Implemented a design system that reduced development time by 60%.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      video: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      metrics: [
        { label: "Conversion Rate", value: "+42%" },
        { label: "User Engagement", value: "+65%" },
        { label: "Mobile Sales", value: "+78%" },
        { label: "Page Load Time", value: "-55%" }
      ],
      tags: ["UI/UX Design", "Design System", "A/B Testing", "Analytics"],
      year: "2024",
      client: "TechRetail Inc.",
      role: "Lead Product Designer",
      link: "#"
    },
    {
      id: 2,
      title: "Healthcare App Redesign",
      subtitle: "Enhancing Patient Experience",
      description: "Redesigned a healthcare app to improve patient engagement and satisfaction. Focused on intuitive navigation, accessibility, and data visualization. Implemented a design system that reduced development time by 50%.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
      video: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
      metrics: [
        { label: "Patient Engagement", value: "+50%" },
        { label: "Data Accuracy", value: "+30%" },
        { label: "App Usage", value: "+45%" }
      ],
      tags: ["UI/UX Design", "Design System", "Data Visualization", "Analytics"],
      year: "2024",
      client: "HealthTech Solutions",
      role: "Lead Product Designer"
    },
    {
      id: 3,
      title: "Financial Dashboard Platform",
      subtitle: "Real-time Data Visualization",
      description: "Created a comprehensive financial dashboard for enterprise clients, featuring real-time analytics, customizable widgets, and advanced data visualization. Reduced information retrieval time by 70%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      metrics: [
        { label: "Data Processing", value: "+85%" },
        { label: "User Satisfaction", value: "+72%" },
        { label: "Decision Speed", value: "+60%" }
      ],
      tags: ["Dashboard Design", "Data Viz", "Enterprise UX", "Real-time"],
      year: "2023",
      client: "FinanceFlow Corp",
      role: "Senior UX Designer",
      link: "#"
    },
    {
      id: 4,
      title: "Social Media Platform",
      subtitle: "Community Engagement & Growth",
      description: "Redesigned core features of a social media platform to boost engagement and retention. Introduced new interaction patterns, personalization features, and streamlined content creation tools.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
      video: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
      metrics: [
        { label: "Daily Active Users", value: "+55%" },
        { label: "Time on Platform", value: "+48%" },
        { label: "Content Creation", value: "+92%" }
      ],
      tags: ["Social Design", "Mobile First", "Engagement", "Growth"],
      year: "2023",
      client: "SocialConnect",
      role: "Product Design Lead",
      link: "#"
    },
  ];

  const handleMouseEnter = (projectId: number) => {
    setHoveredProject(projectId);
    const video = videoRefs.current[projectId];
    if (video) {
      video.play().catch(err => console.log('Video play failed:', err));
    }
  };

  const handleMouseLeave = (projectId: number) => {
    setHoveredProject(null);
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
      <div className="min-h-screen w-full">
        {/* Hero Section with FaultyTerminal */}
        <section className="relative h-screen w-full overflow-hidden bg-black" ref={heroRef}>
          {/* GradientBlinds (bg1 - saved for later) */}
          {/* <div className="absolute top-0 left-0 w-full h-full z-0" style={{ width: '100%', height: '100%', opacity: 0.9 }}>
          <GradientBlinds
            gradientColors={['#ff0080', '#00d4ff', '#8a5cff', '#00ffd1', '#ff6b9d', '#4d9eff']}
            angle={45}
            noise={0.15}
            blindCount={18}
            blindMinWidth={80}
            spotlightRadius={0.35}
            spotlightSoftness={0.8}
            spotlightOpacity={0.3}
            mouseDampening={0.12}
            distortAmount={2}
            shineDirection="left"
            mixBlendMode="normal"
          />
        </div> */}

          {/* FaultyTerminal Background (ACTIVE) */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <FaultyTerminal
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={1}
                pause={pauseTerminal}
                scanlineIntensity={0.9}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={2.5}
                dither={0.8}
                curvature={0.3}
                tint="#00d4ff"
                mouseReact={true}
                mouseStrength={0.8}
                pageLoadAnimation={false}
                brightness={0.95}
            />
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 flex h-full items-center justify-center px-4" style={{ pointerEvents: 'none' }}>
            <div className="max-w-4xl text-center" style={{ pointerEvents: 'auto' }}>
              <motion.h1
                  className="mb-6 text-6xl md:text-8xl text-white"
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.9)',
                    WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
                Projects
              </motion.h1>

              <motion.p
                  className="mb-8 text-xl md:text-2xl text-white"
                  style={{
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 6px rgba(0, 0, 0, 0.95)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
              >
                Exploring the intersection of design and technology
              </motion.p>

              <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                    className="px-8 py-4 bg-black text-white rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                    onClick={() => {
                      const projectsSection = document.getElementById('projects-grid');
                      projectsSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                  View Projects
                </button>
                <button
                    className="px-8 py-4 bg-white text-black rounded-full border-2 border-white hover:bg-black hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                    onClick={onBack}
                >
                  Back to Dashboard
                </button>
              </motion.div>

              <motion.div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div
                    className="text-white text-sm"
                    style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}
                >
                  Scroll to explore
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section
            id="projects-grid"
            className={`min-h-screen w-full py-20 px-4 md:px-8 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
                className="text-4xl md:text-6xl mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              Selected Works
            </motion.h2>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                  <motion.div
                      key={project.id}
                      id={`project-${project.id}`}
                      className="group relative aspect-square bg-[#111111] rounded-2xl overflow-hidden cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Image */}
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-mono rounded-full border border-white/20">
                    {project.category}
                  </span>
                    </div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <h3 className="text-2xl mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {project.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 delay-100">
                        {project.year}
                      </p>
                    </div>

                    {/* Project Number */}
                    <div className="absolute top-6 right-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-10">
                      {String(project.id).padStart(2, '0')}
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Outcomes Section with ScrollStack */}
        <section className="bg-[#0b0615] py-20">
          <div className="px-8 pb-12">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                  className="text-4xl md:text-6xl mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
              >
                Business <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">Outcomes</span>
              </motion.h2>
              <motion.p
                  className="text-base text-gray-400 max-w-2xl mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                A curated selection of impactful projects that showcase design excellence,
                innovation, and measurable business results.
              </motion.p>
            </div>
          </div>

          <div className="flex items-center justify-center px-8 pt-12">
            <div className="w-full max-w-5xl h-screen">
              <ScrollStack
                  itemDistance={200}
                  itemStackDistance={30}
                  stackPosition="15%"
                  baseScale={0.85}
                  rotationAmount={0}
                  blurAmount={0}
                  className="h-full"
              >
                {/* Project Card 1 */}
                <ScrollStackItem itemClassName="custom-project-card">
                  <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-600">01</span>
                          <span className="text-xs text-gray-600">{featuredProjects[0].year}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{featuredProjects[0].client}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl mb-2">{featuredProjects[0].title}</h2>
                        <p className="text-base md:text-lg text-gray-400">{featuredProjects[0].subtitle}</p>
                      </div>
                      {featuredProjects[0].link && (
                          <motion.a
                              href={featuredProjects[0].link}
                              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                              whileHover={{ scale: 1.1, rotate: 45 }}
                              whileTap={{ scale: 0.95 }}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </motion.a>
                      )}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Image/Video Section */}
                      <motion.div
                          className="relative rounded-2xl overflow-hidden bg-black aspect-[16/10] cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(featuredProjects[0].id)}
                          onMouseLeave={() => handleMouseLeave(featuredProjects[0].id)}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                      >
                        {/* Static Image */}
                        <img
                            src={featuredProjects[0].image}
                            alt={featuredProjects[0].title}
                            className="w-full h-full object-cover"
                        />

                        {/* Video Overlay (shown on hover) */}
                        {featuredProjects[0].video && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredProject === featuredProjects[0].id ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                              <video
                                  ref={(el) => (videoRefs.current[featuredProjects[0].id] = el)}
                                  src={featuredProjects[0].video}
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover"
                              />
                            </motion.div>
                        )}

                        {/* Play Icon Overlay */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredProject === featuredProjects[0].id ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                          <motion.div
                              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </motion.div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Role Tag */}
                        <div className="absolute bottom-4 left-4">
                          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                            {featuredProjects[0].role}
                          </div>
                        </div>
                      </motion.div>

                      {/* Info Section */}
                      <div className="flex flex-col justify-between">
                        {/* Description */}
                        <div className="mb-6">
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {featuredProjects[0].description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {featuredProjects[0].tags.map((tag, tagIndex) => (
                                <motion.span
                                    key={tagIndex}
                                    className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-gray-800/50"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                  {tag}
                                </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {featuredProjects[0].metrics.map((metric, metricIndex) => (
                              <motion.div
                                  key={metricIndex}
                                  className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-gray-800/50 relative overflow-hidden group/metric"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                              >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                  <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                  <div className="text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {metric.value}
                                  </div>
                                </div>
                              </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>

                {/* Project Card 2 */}
                <ScrollStackItem itemClassName="custom-project-card">
                  <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-600">02</span>
                          <span className="text-xs text-gray-600">{featuredProjects[1].year}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{featuredProjects[1].client}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl mb-2">{featuredProjects[1].title}</h2>
                        <p className="text-base md:text-lg text-gray-400">{featuredProjects[1].subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div
                          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                          onMouseEnter={() => setHoveredProject(featuredProjects[1].id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          whileHover={{ scale: 1.02 }}
                      >
                        {featuredProjects[1].video && (
                            <motion.div className="absolute inset-0">
                              <video
                                  autoPlay={hoveredProject === featuredProjects[1].id}
                                  src={featuredProjects[1].video}
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover"
                              />
                            </motion.div>
                        )}

                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredProject === featuredProjects[1].id ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                          <motion.div
                              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-4 left-4">
                          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                            {featuredProjects[1].role}
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex flex-col justify-between">
                        <div className="mb-6">
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {featuredProjects[1].description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {featuredProjects[1].tags.map((tag, tagIndex) => (
                                <motion.span
                                    key={tagIndex}
                                    className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-gray-800/50"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                  {tag}
                                </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {featuredProjects[1].metrics.map((metric, metricIndex) => (
                              <motion.div
                                  key={metricIndex}
                                  className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                                  whileHover={{ y: -2 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                  <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                  <div className="text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {metric.value}
                                  </div>
                                </div>
                              </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>

                {/* Project Card 3 */}
                <ScrollStackItem itemClassName="custom-project-card">
                  <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-600">03</span>
                          <span className="text-xs text-gray-600">{featuredProjects[2].year}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{featuredProjects[2].client}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl mb-2">{featuredProjects[2].title}</h2>
                        <p className="text-base md:text-lg text-gray-400">{featuredProjects[2].subtitle}</p>
                      </div>
                      {featuredProjects[2].link && (
                          <motion.a
                              href={featuredProjects[2].link}
                              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                              whileHover={{ scale: 1.1, rotate: 45 }}
                              whileTap={{ scale: 0.95 }}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </motion.a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div
                          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                          onMouseEnter={() => setHoveredProject(featuredProjects[2].id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          whileHover={{ scale: 1.02 }}
                      >
                        <img
                            src={featuredProjects[2].image}
                            alt={featuredProjects[2].title}
                            className="w-full h-full object-cover"
                        />

                        {featuredProjects[2].video && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredProject === featuredProjects[2].id ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                              <video
                                  autoPlay={hoveredProject === featuredProjects[2].id}
                                  src={featuredProjects[2].video}
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover"
                              />
                            </motion.div>
                        )}

                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredProject === featuredProjects[2].id ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                          <motion.div
                              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-4 left-4">
                          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                            {featuredProjects[2].role}
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex flex-col justify-between">
                        <div className="mb-6">
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {featuredProjects[2].description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {featuredProjects[2].tags.map((tag, tagIndex) => (
                                <motion.span
                                    key={tagIndex}
                                    className="px-3xl py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-gray-800/50"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                  {tag}
                                </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {featuredProjects[2].metrics.map((metric, metricIndex) => (
                              <motion.div
                                  key={metricIndex}
                                  className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                                  whileHover={{ y: -2 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                  <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                  <div className="text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {metric.value}
                                  </div>
                                </div>
                              </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>

                {/* Project Card 4 */}
                <ScrollStackItem itemClassName="custom-project-card">
                  <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-600">04</span>
                          <span className="text-xs text-gray-600">{featuredProjects[3].year}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{featuredProjects[3].client}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl mb-2">{featuredProjects[3].title}</h2>
                        <p className="text-base md:text-lg text-gray-400">{featuredProjects[3].subtitle}</p>
                      </div>
                      {featuredProjects[3].link && (
                          <motion.a
                              href={featuredProjects[3].link}
                              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                              whileHover={{ scale: 1.1, rotate: 45 }}
                              whileTap={{ scale: 0.95 }}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </motion.a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div
                          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                          onMouseEnter={() => setHoveredProject(featuredProjects[3].id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          whileHover={{ scale: 1.02 }}
                      >
                        <img
                            src={featuredProjects[3].image}
                            alt={featuredProjects[3].title}
                            className="w-full h-full object-cover"
                        />

                        {featuredProjects[3].video && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredProject === featuredProjects[3].id ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                              <video
                                  autoPlay={hoveredProject === featuredProjects[3].id}
                                  src={featuredProjects[3].video}
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover"
                              />
                            </motion.div>
                        )}

                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredProject === featuredProjects[3].id ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                          <motion.div
                              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-4 left-4">
                          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                            {featuredProjects[3].role}
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex flex-col justify-between">
                        <div className="mb-6">
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {featuredProjects[3].description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {featuredProjects[3].tags.map((tag, tagIndex) => (
                                <motion.span
                                    key={tagIndex}
                                    className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-gray-800/50"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                  {tag}
                                </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {featuredProjects[3].metrics.map((metric, metricIndex) => (
                              <motion.div
                                  key={metricIndex}
                                  className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                                  whileHover={{ y: -2 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                  <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                  <div className="text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {metric.value}
                                  </div>
                                </div>
                              </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
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
              Let's Work Together
            </motion.h2>

            <motion.p
                className="text-xl text-gray-400 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind? Let's create something amazing.
            </motion.p>

            <motion.button
                className="px-12 py-5 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                theme={theme}
            />
        )}
      </div>
  );
}