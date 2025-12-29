import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, ArrowUpRight } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface CaseStudyPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

interface FeaturedProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  year: string;
  client: string;
  role: string;
  link?: string;
}

export function CaseStudyPage({ theme, onBack }: CaseStudyPageProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const featuredProjects: FeaturedProject[] = [
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
        { label: "App Usage", value: "+45%" },
        { label: "Response Time", value: "-20%" }
      ],
      tags: ["UI/UX Design", "Design System", "Data Visualization", "Analytics"],
      year: "2024",
      client: "HealthTech Solutions",
      role: "Lead Product Designer",
      link: "#"
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
    <div className="min-h-screen bg-[#0b0615]">
      {/* Header Section */}
      <div className="px-8 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </motion.button>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl mb-3">
              Featured <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">Work</span>
            </h1>
            <p className="text-base text-gray-400 max-w-2xl">
              A curated selection of impactful projects that showcase design excellence, 
              innovation, and measurable business results.
            </p>
          </motion.div>
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
            {/* First Project Card */}
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

            <ScrollStackItem itemClassName="custom-project-card">
              <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                {/* Project Header */}
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

                {/* Project Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Video Preview */}
                  <motion.div
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                    onMouseEnter={() => setHoveredProject(featuredProjects[1].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Video */}
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

                    {/* Play Icon Overlay */}
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Role Tag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                        {featuredProjects[1].role}
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Section */}
                  <div className="flex flex-col justify-between">
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {featuredProjects[1].description}
                      </p>

                      {/* Tags */}
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

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {featuredProjects[1].metrics.map((metric, metricIndex) => (
                        <motion.div
                          key={metricIndex}
                          className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                          whileHover={{ y: -2 }}
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
            <ScrollStackItem itemClassName="custom-project-card">
              <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                {/* Project Header */}
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

                {/* Project Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Video Preview */}
                  <motion.div
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                    onMouseEnter={() => setHoveredProject(featuredProjects[2].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Image */}
                    <img
                      src={featuredProjects[2].image}
                      alt={featuredProjects[2].title}
                      className="w-full h-full object-cover"
                    />

                    {/* Video Overlay */}
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

                    {/* Play Icon Overlay */}
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Role Tag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                        {featuredProjects[2].role}
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Section */}
                  <div className="flex flex-col justify-between">
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {featuredProjects[2].description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[2].tags.map((tag, tagIndex) => (
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

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {featuredProjects[2].metrics.map((metric, metricIndex) => (
                        <motion.div
                          key={metricIndex}
                          className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                          whileHover={{ y: -2 }}
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
            <ScrollStackItem itemClassName="custom-project-card">
              <div className="bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden h-full p-6 md:p-8">
                {/* Project Header */}
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

                {/* Project Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Video Preview */}
                  <motion.div
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                    onMouseEnter={() => setHoveredProject(featuredProjects[3].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Image */}
                    <img
                      src={featuredProjects[3].image}
                      alt={featuredProjects[3].title}
                      className="w-full h-full object-cover"
                    />

                    {/* Video Overlay */}
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

                    {/* Play Icon Overlay */}
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Role Tag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white">
                        {featuredProjects[3].role}
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Section */}
                  <div className="flex flex-col justify-between">
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {featuredProjects[3].description}
                      </p>

                      {/* Tags */}
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

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {featuredProjects[3].metrics.map((metric, metricIndex) => (
                        <motion.div
                          key={metricIndex}
                          className="relative p-3 rounded-xl bg-white/5 border border-gray-800/50 group/metric"
                          whileHover={{ y: -2 }}
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
          </ScrollStack>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="relative py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative gradient blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="text-4xl md:text-6xl mb-6">
                Want to see more?
              </h2>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Explore the complete portfolio or get in touch to discuss your next project.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={onBack}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Dashboard
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 rounded-full border border-gray-800 hover:border-gray-700 hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                </motion.button>
              </div>

              {/* Small footer text */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-16 pt-8 border-t border-gray-800/50"
              >
                <p className="text-sm text-gray-600">
                  © 2024 Portfolio. Crafted with attention to detail.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}