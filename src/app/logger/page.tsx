'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TimeSpiralLogger } from '@/components/logger/TimeSpiralLogger'
import { FoodSymptomLogger } from '@/components/logger/FoodSymptomLogger'
import { QuickMealLogger } from '@/components/meal/QuickMealLogger'

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { Clock, PlusCircle } from 'lucide-react'

export default function LoggerPage() {
  const [activeTab, setActiveTab] = useState<'spiral' | 'detailed'>('spiral')

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background particles */}
      <CellularParticles count={8} className="opacity-30" />
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 20,
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
            duration: 25,
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
            duration: 18,
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
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-3/4 w-20 h-20 bg-bio-green-400/10 rounded-full filter blur-lg"
        />
        
        <motion.div
          animate={{ 
            x: [0, 40, -80, 0],
            y: [0, -60, 20, 0],
            rotate: [0, 120, 240, 360],
            scale: [1, 0.6, 1.3, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/2 right-3/4 w-16 h-16 bg-probiotic-400/12 rounded-2xl filter blur-md"
        />
      </div>
      
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}
      
      {/* Floating navigation */}
      <FloatingNavigation />

      {/* Tab Navigation - Centered at top */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <OrganicContainer variant="organic" size="md" className="bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex gap-3 p-1">
            <OrganicButton
              variant={activeTab === 'spiral' ? 'primary' : 'ghost'}
              size="md"
              shape="organic"
              onClick={() => setActiveTab('spiral')}
              className={activeTab === 'spiral' ? 'bg-bio-green-400 text-black' : 'text-white/70 hover:text-white'}
            >
              <Clock size={18} className="mr-2" />
              Time Spiral
            </OrganicButton>
            <OrganicButton
              variant={activeTab === 'detailed' ? 'primary' : 'ghost'}
              size="md"
              shape="organic"
              onClick={() => setActiveTab('detailed')}
              className={activeTab === 'detailed' ? 'bg-bio-green-400 text-black' : 'text-white/70 hover:text-white'}
            >
              <PlusCircle size={18} className="mr-2" />
              Detailed Logger
            </OrganicButton>
          </div>
        </OrganicContainer>
      </motion.div>
      
      {/* Main content with proper spacing */}
      <div className="pt-32">
        {activeTab === 'spiral' ? <TimeSpiralLogger /> : <FoodSymptomLogger />}
      </div>
      
      {/* Quick Meal Logger FAB */}
      <QuickMealLogger />
    </div>
  )
}