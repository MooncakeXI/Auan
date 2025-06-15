// frontend/src/components/Header.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.header
      className="sticky top-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="container mx-auto flex items-center justify-between p-4 bg-white/70 backdrop-blur-lg rounded-b-xl shadow-md">
        <Link href="/" className="text-xl font-bold text-pink-600 hover:text-pink-800 transition-colors">
          Dream's BirthDay
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
            Home
          </Link>
          <Link href="/memories" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
            Our Memories
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}