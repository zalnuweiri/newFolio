import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react';

interface ContactProps {
  theme: 'dark' | 'light';
}

export function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSent(false), 3000);
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@micheledu.com' },
  ];

  return (
    <div id="contact" className={`rounded-3xl p-8 md:p-12 border bg-[#111111] border-gray-800/50 relative overflow-hidden mb-12`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl mb-4 text-center">Let's Work Together</h2>
        <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Have a project in mind? I'd love to hear about it.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-black border-gray-800 focus:border-gray-600'
                    : 'bg-white border-gray-300 focus:border-gray-400'
                } focus:outline-none transition-colors`}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-black border-gray-800 focus:border-gray-600'
                    : 'bg-white border-gray-300 focus:border-gray-400'
                } focus:outline-none transition-colors`}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-black border-gray-800 focus:border-gray-600'
                    : 'bg-white border-gray-300 focus:border-gray-400'
                } focus:outline-none transition-colors resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="w-full px-8 py-4 bg-white text-black rounded-full cursor-hover hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? (
                <span>Sending...</span>
              ) : sent ? (
                <span>Message Sent!</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl mb-6">Get In Touch</h3>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  hello@micheledu.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  San Francisco, CA
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className={`w-12 h-12 rounded-full border ${
                      theme === 'dark' ? 'border-gray-800 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center cursor-hover transition-all`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 text-sm">Available for freelance</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className={`mt-16 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Left: Circular Text */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-32 h-32">
                {/* Rotating circular text */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <path
                        id="circlePathContact"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                      />
                    </defs>
                    <text className="text-[11px] fill-gray-500 uppercase tracking-wider">
                      <textPath href="#circlePathContact" startOffset="0%">
                        LET'S WORK TOGETHER • GET IN TOUCH • 
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Center: Social Links */}
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'} transition-colors relative group`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                    
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Right: Copyright & Info */}
            <div className="text-center md:text-right space-y-2">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                &copy; 2025 Zayd Alnuweiri
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-700' : 'text-gray-500'}`}>
                Crafted with passion and precision
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}