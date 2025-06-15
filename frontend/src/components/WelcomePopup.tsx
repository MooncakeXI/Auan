'use client'

import { motion } from 'framer-motion';

// ไอคอนรูปของขวัญ (SVG Component)
const GiftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-pink-500 mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    />
  </svg>
);

interface WelcomePopupProps {
  onConfirm: () => void;
}

export default function WelcomePopup({ onConfirm }: WelcomePopupProps) {
  return (
    // Backdrop พร้อมเอฟเฟกต์เบลอและ Fade-in
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* การ์ด Popup พร้อม Animation แบบสปริง */}
      <motion.div
        className="relative bg-gradient-to-br from-white to-pink-50 rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl border border-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="flex justify-center">
            <GiftIcon />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          A Special Surprise!
        </h2>
        <p className="text-gray-600 mb-8">
          พร้อมสำหรับของขวัญวันเกิดสุดพิเศษหรือยัง? กดปุ่มด้านล่างเพื่อเริ่มต้นการเดินทาง!
        </p>

        {/* ปุ่มพร้อม Animation */}
        <motion.button
          onClick={onConfirm}
          className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg transform transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          เปิดของขวัญ 🎉
        </motion.button>
      </motion.div>
    </motion.div>
  );
}