"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: window.innerWidth - 200, top: 0, bottom: window.innerHeight - 100 }}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      className="fixed bg-white shadow-lg rounded-xl p-2 flex space-x-2 items-center cursor-grab active:cursor-grabbing"
      style={{ top: position.y, left: position.x }}
    >
      <FloatingMenuItem href="/journal" label="📖 Journal" />
      <FloatingMenuItem href="/todo" label="✅ To-Do List" />
      <FloatingMenuItem href="/pages" label="💰 Expenses" />
    </motion.div>
  );
};

const FloatingMenuItem = ({ href, label }) => {
  return (
    <Link href={href} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
      {label}
    </Link>
  );
};

export default Navbar;
