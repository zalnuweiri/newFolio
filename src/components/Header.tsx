import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Spiral from './Spiral';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'Home', label: 'Home' },
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Projects', label: 'Projects' },
    { id: 'Case Study', label: 'Featured Works' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  return (
    <header className="max-w-[1600px] mx-auto relative">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <motion.div 
          className="text-xs tracking-widest text-gray-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          ZAYD ALNUWEIRI
        </motion.div>

        <nav className="flex gap-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-5 py-2 rounded-full text-xs transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </nav>

        <motion.div 
          className="w-[75px] h-[75px] rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition-transform"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleTabClick('About')}
        >
          <Spiral />
        </motion.div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between">
        <div className="text-xs tracking-widest text-gray-400">
          MICHELE DU
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.nav
          className="md:hidden absolute top-12 left-0 right-0 bg-[#111111] border border-gray-800 rounded-2xl p-4 mt-2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                handleTabClick(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-5 py-3 rounded-lg text-sm transition-all duration-300 mb-2 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleTabClick('About');
              setMobileMenuOpen(false);
            }}
            className={`w-full px-5 py-3 rounded-lg text-sm transition-all duration-300 ${
              activeTab === 'About'
                ? 'bg-white text-black'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            About Me
          </button>
        </motion.nav>
      )}
    </header>
  );
}