'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import WelcomePopup from '@/components/WelcomePopup' // 1. Import WelcomePopup
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Dynamic Imports ---
const Countdown = dynamic(() => import('@/components/Countdown'), { ssr: false })
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })
const CelebrationSection = dynamic(() => import('@/components/CelebrationSection'), { ssr: false })
const SakuraEffect = dynamic(() => import('@/components/SakuraEffect'), { ssr: false })

export default function HomePage() {
  const surpriseTime = '2025-06-11T14:34:00'
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // --- State ที่ปรับปรุงใหม่ ---
  const [isReady, setIsReady] = useState(false) // 2. State สำหรับควบคุมการเริ่ม
  const [isCelebrationTime, setIsCelebrationTime] = useState(false)
  const [showBirthdayText, setShowBirthdayText] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  useEffect(() => {
    function updateSize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // 3. ฟังก์ชันสำหรับเริ่มทุกอย่างหลังกดยืนยัน
  const handleStart = () => {
    setIsReady(true);
    audioRef.current?.play().catch(() => console.log('Autoplay blocked'));
  };

  const handleCountdownComplete = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1
    }
    setIsCelebrationTime(true) 
    setShowBirthdayText(true)

    setTimeout(() => {
      setIsCelebrationTime(false)
      setShowBirthdayText(false)
    }, 5000) 
  }

  return (
    <div className="relative">
      {/* 4. ควบคุมการแสดงผลด้วย isReady */}
      {!isReady && <WelcomePopup onConfirm={handleStart} />}

      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* เอฟเฟกต์ฉลองตอน Countdown จบ */}
            <AnimatePresence>
              {isCelebrationTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                  <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={400}
                    gravity={0.15}
                  />
                  <SakuraEffect />
                </motion.div>
              )}
            </AnimatePresence>
            
            <Hero name="ไออ้วน" imageUrl="/hero-bg.jpg" />
            
            <div className="max-w-4xl mx-auto p-8 space-y-12">
              <motion.section 
                className="text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // 5. once: true ทำให้ animation เล่นแค่ครั้งเดียว
              >
                <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  Countdown to Your Special Day
                </h2>
                <Countdown targetDate={surpriseTime} onComplete={handleCountdownComplete} />
              </motion.section>

              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // 5. once: true ทำให้ animation เล่นแค่ครั้งเดียว
              >
                <CelebrationSection />
              </motion.section>
            </div>

            <audio ref={audioRef} src="/audio/birthday-song.mp3" loop />
            
            <AnimatePresence>
              {showBirthdayText && (
                 <motion.div 
                  className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
                  exit={{ opacity: 0, scale: 1.2, transition: { duration: 1, ease: 'easeIn' } }}
                 >
                  <h1 className="text-5xl md:text-8xl font-extrabold text-white text-center drop-shadow-lg"
                    style={{ textShadow: '0 0 25px rgba(236, 72, 153, 0.8)' }}
                  >
                    Happy Birthday!
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}