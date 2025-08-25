'use client'

import { PersonalizedRecommendations } from '@/components/recommendations/PersonalizedRecommendations'

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'
import { motion } from 'framer-motion'

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background particles */}
      <CellularParticles count={12} className="opacity-30" />
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 120, -60, 0],
            y: [0, -70, 40, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-bio-green-400/15 rounded-3xl filter blur-xl"
        />
        
        <motion.div
          animate={{ 
            x: [0, -150, 75, 0],
            y: [0, 100, -40, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.7, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-probiotic-400/15 rounded-3xl filter blur-xl"
        />
        
        <motion.div
          animate={{ 
            x: [0, 80, -40, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-enzyme-400/15 rounded-2xl filter blur-lg"
        />
        
        <motion.div
          animate={{ 
            x: [0, -60, 120, 0],
            y: [0, 90, -30, 0],
            rotate: [0, -90, 180, 0],
            scale: [1, 1.1, 0.8, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-3/4 w-20 h-20 bg-bio-green-400/10 rounded-full filter blur-lg"
        />
      </div>
      
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      {/* Main content */}
      <PersonalizedRecommendations />
    </div>
  )
}