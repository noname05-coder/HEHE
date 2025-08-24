'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from '@/components/Intro'
import ComicOverview from '@/components/ComicOverview'
import MangaStoryFlow from '@/components/MangaStoryFlow'
import FinalMessage from '@/components/FinalMessage'

type Scene = 'intro' | 'overview' | 'story' | 'final'

export default function Home() {
  const [currentScene, setCurrentScene] = useState<Scene>('intro')

  const handleSceneTransition = (scene: Scene) => {
    setCurrentScene(scene)
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {currentScene === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <Intro onComplete={() => handleSceneTransition('overview')} />
          </motion.div>
        )}

        {currentScene === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ComicOverview onComplete={() => handleSceneTransition('story')} />
          </motion.div>
        )}

        {currentScene === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MangaStoryFlow onComplete={() => handleSceneTransition('final')} />
          </motion.div>
        )}

        {currentScene === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
