'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface MangaStoryFlowProps {
  onComplete: () => void
}

export default function MangaStoryFlow({ onComplete }: MangaStoryFlowProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showClosingEye, setShowClosingEye] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  const pages = [
    { id: 1, src: '/comic/p1.png', tilt: -5 },
    { id: 2, src: '/comic/p2.png', tilt: 3 },
    { id: 3, src: '/comic/p3.png', tilt: -2 },
    { id: 4, src: '/comic/p4.png', tilt: 4 },
  ]

  useEffect(() => {
    if (isPaused) return

    if (showIntro) {

      const introTimer = setTimeout(() => {
        setShowIntro(false)
        setCurrentPage(1)
      }, 10000)
      
      return () => {
        clearTimeout(introTimer)
      }
    }

    if (currentPage === 0) return


    const readingTimer = setTimeout(() => {
      if (currentPage < pages.length) {

        setCurrentPage(prev => prev + 1)
      } else {

        setShowClosingEye(true)

        setTimeout(() => {
          setShowClosingEye(false)
          setShowVideo(true)

        }, 7000)
      }
    }, 5000)

    return () => {
      clearTimeout(readingTimer)
    }
  }, [currentPage, onComplete, isPaused, showIntro])

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(prev => prev + 1)
    } else if (!showVideo) {

      setShowClosingEye(true)

      setTimeout(() => {
        setShowClosingEye(false)
        setShowVideo(true)

      }, 7000)
    } else {

    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showIntro || showVideo) return
      
      switch (event.key) {
        case 'ArrowLeft':
          previousPage()
          break
        case 'ArrowRight':
          nextPage()
          break
        case ' ':
          event.preventDefault()
          setIsPaused(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showIntro, showVideo, currentPage])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #374151 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, #374151 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      
      {showIntro && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center max-w-4xl px-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.h1
              className="text-red-600 text-4xl md:text-6xl font-bold mb-8"
              animate={{
                textShadow: [
                  "0 0 10px #dc2626",
                  "0 0 20px #dc2626",
                  "0 0 30px #dc2626",
                  "0 0 20px #dc2626",
                  "0 0 10px #dc2626"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BASED ON TRUE STORY
            </motion.h1>
            
            <motion.p
              className="text-red-500 text-lg md:text-xl font-semibold leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              24th August 2025<br />
              How a guy forgot his friend's birthday<br />
              and how his friend killed him
            </motion.p>
            
            <motion.div
              className="text-gray-400 text-sm md:text-base italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              (Disclaimer: No one is injured. Many this just like every other comic. It's not properly true)
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      
      {!showIntro && currentPage > 0 && !showVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
        
        <motion.div
          key={currentPage}
          className="relative z-10"
          initial={{ 
            scale: 0.3, 
            opacity: 0,
            rotateY: 90,
            rotateZ: pages[currentPage - 1]?.tilt - 10 || -15
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotateY: 0,
            rotateZ: pages[currentPage - 1]?.tilt || 0
          }}
          exit={{
            scale: 0.3,
            opacity: 0,
            rotateY: -90,
            rotateZ: pages[currentPage - 1]?.tilt + 10 || 15
          }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 80
          }}
        >
          
          <div className="relative w-96 h-[500px] md:w-[500px] md:h-[650px] lg:w-[600px] lg:h-[780px]">
            
            <div className="absolute inset-0 bg-black opacity-40 transform translate-x-6 translate-y-8 rounded-lg blur-md" />
            
            
            <div className="relative w-full h-full bg-white rounded-lg overflow-hidden reading-light-page">
              <Image
                src={pages[currentPage - 1]?.src || ''}
                alt={`Manga page ${currentPage}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 384px, (max-width: 1024px) 500px, 600px"
                priority
              />
            </div>
          </div>
        </motion.div>
        </div>
      )}

      
      {showVideo && !showClosingEye && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          
          <div className="relative w-full max-w-4xl">
            
            <div className="absolute inset-0 bg-black opacity-40 transform translate-x-6 translate-y-8 rounded-lg blur-md" />
            
            
            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[60vh] object-contain"
              >
                <source src="/comic/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          
          <motion.div
            className="mt-8 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            
            <div className="flex-1 text-center lg:text-left">
              <p className="text-white text-lg md:text-xl leading-relaxed font-medium bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                "idk how this turned out but muje bhi pata hai ki muje design ni aata but yess this is a handmade gift i made for you HEHE and this is for being such a wonderfull good friend and also it is just a small token of thanks from my side too , ABB ZAYADA EMOTIONAL NAA HONA, we are even now. HEHE, CHALO ABB SONG BHI SUN LO"
              </p>
            </div>

            
            <div className="w-full lg:w-80 flex-shrink-0">
              <iframe 
                data-testid="embed-iframe" 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/0fIbPMXnTdyuW2UirA9mWQ?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      
      {!showIntro && !showVideo && (
        <div className="absolute top-8 right-8 z-40">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-white/30"
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
        </div>
      )}

      
      {!showIntro && currentPage > 0 && !showVideo && (
        <>
          
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40">
            <button
              onClick={previousPage}
              disabled={currentPage <= 1}
              className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full font-bold transition-all duration-300 border border-white/30 ${
                currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
            >
              ◀️
            </button>
          </div>

          
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40">
            <button
              onClick={nextPage}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full font-bold transition-all duration-300 border border-white/30 hover:scale-110"
            >
              ▶️
            </button>
          </div>
        </>
      )}

      
      {!showIntro && currentPage > 0 && !showVideo && (
        <div className="absolute bottom-8 left-8 z-40">
          <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30">
            Page {currentPage} of {pages.length}
          </div>
        </div>
      )}

      
      {!showIntro && currentPage > 0 && !showVideo && (
        <div className="absolute bottom-8 right-8 z-40">
          <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 text-sm">
            ← → arrows or click buttons • Space to pause
          </div>
        </div>
      )}

      
      {showClosingEye && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          
          <motion.div
            className="absolute top-0 left-0 w-full bg-black"
            initial={{ height: "0%" }}
            animate={{ height: "50%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              borderRadius: "0 0 50% 50%",
            }}
          />
          
          
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-black"
            initial={{ height: "0%" }}
            animate={{ height: "50%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              borderRadius: "50% 50% 0 0",
            }}
          />
          
          
          <motion.div
            className="text-white text-2xl font-bold z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 6, delay: 1 }}
          >
            He gave a pretty good surprise, didn't he? , Next for you , HEHE<br />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
