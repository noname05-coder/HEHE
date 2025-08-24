'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ComicOverviewProps {
  onComplete: () => void
}

export default function ComicOverview({ onComplete }: ComicOverviewProps) {
  const [showPages, setShowPages] = useState(false)
  const [startZoom, setStartZoom] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPages(true)
    }, 500)

    const zoomTimer = setTimeout(() => {
      setStartZoom(true)
    }, 3000)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(zoomTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const pages = [
    { id: 1, src: '/comic/p1.png', position: 'top-left' },
    { id: 2, src: '/comic/p2.png', position: 'bottom-right' },
    { id: 3, src: '/comic/p3.png', position: 'bottom-left' },
    { id: 4, src: '/comic/p4.png', position: 'top-right' },
  ]

  const getPageStyle = (position: string) => {
    switch (position) {
      case 'top-left':
        return { top: '10%', left: '15%', rotate: '-5deg' }
      case 'top-right':
        return { top: '15%', right: '10%', rotate: '3deg' }
      case 'bottom-left':
        return { bottom: '15%', left: '10%', rotate: '4deg' }
      case 'bottom-right':
        return { bottom: '10%', right: '15%', rotate: '-2deg' }
      default:
        return { top: '50%', left: '50%', rotate: '0deg' }
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      <div className="absolute inset-0 bg-gray-100 paper-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-80"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #8B4513 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, #8B4513 2px, transparent 2px),
              radial-gradient(circle at 20% 80%, #8B4513 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, #8B4513 2px, transparent 2px)
            `,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {pages.map((page, index) => {
        const style = getPageStyle(page.position)
        
        return (
          <motion.div
            key={page.id}
            className="absolute w-64 h-80 shadow-2xl"
            style={{
              ...style,
              transform: `translate(-50%, -50%) rotate(${style.rotate})`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              y: 100,
              rotate: parseFloat(style.rotate) + 180 
            }}
            animate={{ 
              opacity: showPages ? 1 : 0, 
              scale: showPages ? 1 : 0.3,
              y: 0,
              rotate: parseFloat(style.rotate)
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-20 transform translate-x-2 translate-y-2 rounded-lg" />
            
            <div className="relative w-full h-full bg-white rounded-lg overflow-hidden border-4 border-gray-800">
              <Image
                src={page.src}
                alt={`Manga page ${page.id}`}
                fill
                className="object-cover"
                sizes="256px"
              />
              
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-sm font-bold">
                {page.id}
              </div>
            </div>

            <div className="absolute -top-2 left-4 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-600" />
            <div className="absolute -top-2 right-4 w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-blue-600" />
          </motion.div>
        )
      })}

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ clipPath: 'circle(0% at 25% 25%)' }}
        animate={{ 
          clipPath: startZoom ? 'circle(150% at 25% 25%)' : 'circle(0% at 25% 25%)' 
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: showPages ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-manga text-gray-800 text-center drop-shadow-lg">
          The Story Begins...
        </h1>
      </motion.div>
    </div>
  )
}
