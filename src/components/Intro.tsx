'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface IntroProps {
  onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true)
    }, 1000)

    const buttonTimer = setTimeout(() => {
      setShowButton(true)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleNoClick = () => {
    setButtonClicked(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  const mainText = "Are you still mad?"
  const letters = mainText.split('')

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Minimalist geometric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
          {/* Simple geometric shapes */}
          <div className="absolute top-16 left-16 w-20 h-20 border-4 border-gray-800 rounded-full opacity-20"></div>
          <div className="absolute top-32 right-24 w-16 h-16 bg-gray-900 transform rotate-45 opacity-15"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 border-4 border-gray-700 opacity-25"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-gray-600 rounded-full opacity-20"></div>
          <div className="absolute bottom-16 right-16 w-8 h-20 bg-gray-800 opacity-20"></div>
        </div>
      </div>

      {/* Simple animated decorations */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => {
          const shapes = ['●', '■', '▲', '◆', '○', '□'];
          return (
            <motion.div
              key={i}
              className="absolute text-2xl text-gray-700"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {shapes[Math.floor(Math.random() * shapes.length)]}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6" style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontWeight: '800',
          }}>
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.8 
                }}
                animate={{ 
                  opacity: showText ? 1 : 0, 
                  y: 0, 
                  scale: 1 
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                style={{
                  color: letter === '?' ? '#000000' : '#1F2937',
                  textShadow: `
                    2px 2px 0px #ffffff,
                    4px 4px 8px rgba(0, 0, 0, 0.1)
                  `,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: showText ? 1 : 0, 
            scale: showText ? 1 : 0.9 
          }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="bg-gray-100 border-4 border-gray-900 rounded-2xl px-8 py-6 transform rotate-1 shadow-xl"
               style={{
                 fontFamily: 'Inter, -apple-system, sans-serif',
                 boxShadow: '6px 6px 0px #000000, 0px 0px 20px rgba(0,0,0,0.1)'
               }}>
            <div className="flex items-center justify-center mb-3">
              <motion.span 
                className="text-3xl mr-3"
                animate={{ 
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚠
              </motion.span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide transform -rotate-1">
                Important Notice
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 font-medium transform rotate-1">
              You can't be mad... because what's coming next will make you smile! 😊
            </p>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: showButton ? 1 : 0, 
            y: showButton ? 0 : 50 
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            onClick={handleNoClick}
            className="relative group px-12 py-4 text-white text-xl md:text-2xl font-bold rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden transform -rotate-1"
            whileHover={{ 
              scale: 1.05,
              rotate: 1,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95, rotate: -1 }}
            disabled={buttonClicked}
            style={{
              background: buttonClicked 
                ? 'linear-gradient(45deg, #6B7280, #4B5563)' 
                : 'linear-gradient(45deg, #1F2937, #374151)',
              fontFamily: 'Inter, -apple-system, sans-serif',
              border: '4px solid #000000',
              boxShadow: buttonClicked 
                ? '6px 6px 0px #000000, 3px 3px 15px rgba(0,0,0,0.3)'
                : '6px 6px 0px #000000, 3px 3px 15px rgba(0,0,0,0.3)',
            }}
          >
            
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl" />
            
            
            <span className="relative z-10">
              {buttonClicked ? (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  ✓ Good choice!
                </motion.span>
              ) : (
                "No"
              )}
            </span>

            
            {!buttonClicked && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-gray-300 text-lg"
                    style={{
                      left: `${25 + Math.random() * 50}%`,
                      top: `${25 + Math.random() * 50}%`,
                    }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: Math.random() * 1,
                    }}
                  >
                    ●
                  </motion.div>
                ))}
              </div>
            )}
          </motion.button>

          
          <motion.p
            className="mt-6 text-sm text-gray-600 font-medium italic transform rotate-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 0.8 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}
          >
            (This is the only option... because we know you can't stay mad!)
          </motion.p>
        </motion.div>
      </div>

      
      {buttonClicked && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            background: 'linear-gradient(45deg, #F3F4F6, #E5E7EB, #D1D5DB, #9CA3AF, #6B7280)'
          }}
        />
      )}
    </div>
  )
}
