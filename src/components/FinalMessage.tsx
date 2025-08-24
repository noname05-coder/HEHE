'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalMessage() {
  const [showText, setShowText] = useState(false)
  const [showDoodles, setShowDoodles] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500)
    const doodleTimer = setTimeout(() => setShowDoodles(true), 2000)
    const confettiTimer = setTimeout(() => setShowConfetti(true), 3000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(doodleTimer)
      clearTimeout(confettiTimer)
    }
  }, [])

  const birthdayText = "Happy Birthday 🎂🐧💙"
  const sorryText = "Sorry for forgetting... but you're the best!"

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700">
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #8B4513 1px, transparent 1px),
              linear-gradient(#8B4513 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        
        <div className="absolute inset-0 bg-graffiti-texture opacity-40" />
      </div>

      
      {showDoodles && (
        <>
          
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                color: '#FFD700',
                textShadow: '0 0 10px currentColor',
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 1.5, 
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              ⭐
            </motion.div>
          ))}

          
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                color: '#FF69B4',
                textShadow: '0 0 15px currentColor',
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.3, 1],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              💖
            </motion.div>
          ))}

          
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              className="absolute text-5xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${70 + Math.random() * 20}%`,
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: [100, -20, 0],
                opacity: [0, 1, 1],
                x: [0, Math.sin(i) * 20, 0]
              }}
              transition={{ 
                duration: 3, 
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              🎈
            </motion.div>
          ))}
        </>
      )}

      
      {showDoodles && (
        <motion.div
          className="absolute bottom-10 right-10 text-8xl"
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🐧
        </motion.div>
      )}

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 50 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-8xl font-graffiti font-bold text-white graffiti-glow mb-4">
            {birthdayText.split('').map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 20, rotate: -10 }}
                animate={{ 
                  opacity: showText ? 1 : 0, 
                  y: 0, 
                  rotate: 0 
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{
                  color: index % 3 === 0 ? '#FFD700' : index % 3 === 1 ? '#FF69B4' : '#87CEEB',
                  textShadow: `
                    0 0 20px currentColor,
                    0 0 40px currentColor,
                    0 0 60px currentColor
                  `,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showText ? 1 : 0, 
            scale: showText ? 1 : 0.8 
          }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-2xl md:text-4xl font-graffiti text-coral-100 drop-shadow-lg">
            {sorryText}
          </p>
        </motion.div>

        
        <motion.div
          className="mt-12 text-9xl"
          initial={{ scale: 0 }}
          animate={{ 
            scale: showDoodles ? 1 : 0,
            rotate: [0, -5, 5, -5, 0]
          }}
          transition={{ 
            scale: { duration: 0.8, delay: 2.5 },
            rotate: { duration: 2, repeat: Infinity, delay: 3 }
          }}
        >
          🎂
        </motion.div>

        
        {showDoodles && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-32">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`flame-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${-20 + i * 20}px`,
                  top: '-40px',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                🕯️
              </motion.div>
            ))}
          </div>
        )}
      </div>

      
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute w-3 h-3"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#FF6B6B', '#98FB98'][i % 5],
              }}
              initial={{ y: -100, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                x: [0, Math.sin(i) * 100, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      
      {showDoodles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: '#FFD700',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
