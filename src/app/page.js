'use client';

import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function Welcome() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute w-64 h-64 bg-white opacity-20 rounded-full top-10 left-10"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-white opacity-10 rounded-full bottom-20 right-20"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />

      {/* Website Name Animation */}
      <motion.h1
        className="text-6xl font-extrabold tracking-wider text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
      >
        Nebula
      </motion.h1>
      
      {/* Floating Menu */}
      <Navbar />
    </div>
  );
}
