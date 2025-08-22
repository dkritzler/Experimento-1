'use client'

import { PatternAnalyzer } from '@/components/patterns/PatternAnalyzer'
import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'
import { motion } from 'framer-motion'

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background particles */}
      <CellularParticles count={8} className="opacity-20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-bio-green-400/10 rounded-3xl filter blur-xl"
        />
        
        <motion.div
          animate={{ 
            x: [0, -120, 60, 0],
            y: [0, 80, -40, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 right-1/4 w-40 h-40 bg-probiotic-400/10 rounded-3xl filter blur-xl"
        />
      </div>
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      {/* Main content */}
      <PatternAnalyzer />
    </div>
  )
}