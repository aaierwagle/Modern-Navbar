"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Youtube, Twitter, ChevronRight } from 'lucide-react';

const navlinks = [
  { 
    path: "/", 
    label: "Home",
    description: "Experience our digital haven where innovation meets design.",
    image: "/api/placeholder/600/400",
    details: ["Latest Updates", "Featured Content", "Quick Access"]
  },
  { 
    path: "/about", 
    label: "About",
    description: "Discover the story and people behind our creative journey.",
    image: "/api/placeholder/600/400",
    details: ["Our Story", "Team", "Vision & Mission"]
  },
  { 
    path: "/projects", 
    label: "Projects",
    description: "Explore our portfolio of innovative digital solutions.",
    image: "/api/placeholder/600/400",
    details: ["Case Studies", "Latest Work", "Process"]
  },
  { 
    path: "/work", 
    label: "Work",
    description: "Join our team and be part of something extraordinary.",
    image: "/api/placeholder/600/400",
    details: ["Careers", "Culture", "Benefits"]
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const menuVariants = {
    hidden: { 
      clipPath: 'circle(0% at 95% 5%)',
      opacity: 0,
    },
    visible: { 
      clipPath: 'circle(150% at 95% 5%)',
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      clipPath: 'circle(0% at 95% 5%)',
      opacity: 0,
    }
  };

  const linkVariants = {
    hidden: { 
      x: 100,
      opacity: 0,
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      x: 100,
      opacity: 0
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className="relative z-50" aria-label="Main navigation">
      <motion.button
        aria-label="Toggle menu"
        className="fixed right-8 top-8 p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed top-0 right-0 h-screen w-full bg-white shadow-2xl flex"
          >
            <motion.button
              aria-label="Close menu"
              className="absolute top-8 right-8 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
            >
              <X size={24} className="text-black" />
            </motion.button>

            <div className="w-1/2 h-full p-16 relative z-10 border-r border-gray-100">
              <div className="mt-16">
                <motion.p 
                  className="text-sm font-medium text-gray-400 tracking-wider mb-12"
                  variants={linkVariants}
                >
                  NAVIGATION
                </motion.p>
                <ul className="space-y-8" role="list">
                  {navlinks.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={linkVariants}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <a 
                        href={link.path}
                        className="block py-2 group relative"
                        title={`Navigate to ${link.label}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-4xl font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                            {link.label}
                          </span>
                          <motion.div
                            animate={{ 
                              x: hoveredIndex === index ? 0 : -10,
                              opacity: hoveredIndex === index ? 1 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="text-gray-400" />
                          </motion.div>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="absolute bottom-16 left-16 right-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-8"
                >
                  {["Instagram", "Facebook", "Youtube", "Twitter"].map((social, index) => (
                    <motion.a 
                      key={index}
                      whileHover={{ scale: 1.2, y: -2 }} 
                      whileTap={{ scale: 0.9 }} 
                      href={`#${social.toLowerCase()}`} 
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                      aria-label={`Follow us on ${social}`}
                    >
                      {social === "Instagram" && <Instagram size={24} />}
                      {social === "Facebook" && <Facebook size={24} />}
                      {social === "Youtube" && <Youtube size={24} />}
                      {social === "Twitter" && <Twitter size={24} />}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="w-1/2 h-full relative overflow-hidden bg-gray-50">
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={imageVariants}
                    className="absolute inset-0 p-16 flex flex-col justify-center"
                  >
                    <div className="relative w-full h-80 mb-8 overflow-hidden rounded-xl">
                      <img 
                        src={navlinks[hoveredIndex].image}
                        alt={`Image related to ${navlinks[hoveredIndex].label}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <h3 className="text-3xl font-medium text-gray-800 mb-4">
                      {navlinks[hoveredIndex].label}
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      {navlinks[hoveredIndex].description}
                    </p>
                    
                    <ul className="space-y-4">
                      {navlinks[hoveredIndex].details.map((detail, index) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <ChevronRight size={16} className="text-gray-400" />
                          <span className="text-lg">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
