'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Microscope, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { MicrobiomeParticles } from '@/components/ui/CellularParticles'

import type { BacteriaProfile, MicrobiomeData } from '@/types'

// Mock microbiome data
const mockMicrobiomeData: MicrobiomeData = {
  id: 'microbiome-1',
  userId: 'current-user',
  testDate: new Date(),
  diversity: 85,
  bacteria: [
    { name: 'Lactobacillus', percentage: 25, type: 'beneficial', trend: 'increasing' },
    { name: 'Bifidobacterium', percentage: 20, type: 'beneficial', trend: 'stable' },
    { name: 'Bacteroides', percentage: 15, type: 'neutral', trend: 'stable' },
    { name: 'Firmicutes', percentage: 12, type: 'neutral', trend: 'decreasing' },
    { name: 'Enterococcus', percentage: 10, type: 'beneficial', trend: 'increasing' },
    { name: 'Proteobacteria', percentage: 8, type: 'harmful', trend: 'decreasing' },
    { name: 'Clostridium', percentage: 6, type: 'harmful', trend: 'stable' },
    { name: 'Others', percentage: 4, type: 'neutral', trend: 'stable' },
  ],
  recommendations: [
    { type: 'probiotic', description: 'Increase Lactobacillus with fermented foods', priority: 'high' },
    { type: 'prebiotic', description: 'Add more fiber to support beneficial bacteria', priority: 'medium' },
    { type: 'dietary', description: 'Reduce processed foods to lower harmful bacteria', priority: 'high' },
  ]
}

const bacteriaColors = {
  beneficial: '#00FF88', // Green (healthy)
  neutral: '#FFD700',    // Yellow (neutral)
  harmful: '#FF0000'     // Red (harmful)
}

const trendColors = {
  increasing: '#00FF88', // Green
  stable: '#FFD700',     // Yellow
  decreasing: '#FF0000'  // Red
}

export function MicrobiomeDashboard() {
  const [selectedBacteria, setSelectedBacteria] = useState<BacteriaProfile | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)


  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    // Use index-based offset instead of random for consistent SSR
    const jitter = ((index * 7) % 20) - 10
    return {
      x: Math.cos(angle) * radius + jitter,
      y: Math.sin(angle) * radius + jitter,
      angle
    }
  }

  const renderBacteriaColony = (bacteria: BacteriaProfile, index: number) => {
    const radius = 200 + (bacteria.percentage * 4) // Increased radius for better spacing
    const position = calculatePosition(index, mockMicrobiomeData.bacteria.length, radius)
    const color = bacteriaColors[bacteria.type]
    
    return (
      <motion.div
        key={bacteria.name}
        className="absolute cursor-pointer"
        style={{
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -5, 0]
        }}
        transition={{ 
          scale: { delay: index * 0.15, duration: 0.5 },
          opacity: { delay: index * 0.15, duration: 0.5 },
          y: { duration: 3 + (index % 3), repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.2, zIndex: 10 }}
        onClick={() => setSelectedBacteria(bacteria)}
      >
        {/* Bacteria Cell */}
        <motion.div
          className="relative"
          style={{ 
            width: bacteria.percentage * 2.5 + 30,
            height: bacteria.percentage * 2.5 + 30,
          }}
        >
          {/* Main cell body */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-80"
            style={{ backgroundColor: color }}
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%'
              ],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: bacteria.percentage * 0.1 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Cell nucleus */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: color, filter: 'brightness(1.5)' }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Pulsing aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-sm opacity-40"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Trend indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black/50 flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
          >
            {bacteria.trend === 'increasing' && <TrendingUp size={10} style={{ 
              color: bacteria.type === 'beneficial' ? bacteriaColors.beneficial : 
                     bacteria.type === 'harmful' ? bacteriaColors.harmful : bacteriaColors.neutral
            }} />}
            {bacteria.trend === 'decreasing' && <TrendingDown size={10} style={{ 
              color: bacteria.type === 'beneficial' ? bacteriaColors.harmful : 
                     bacteria.type === 'harmful' ? bacteriaColors.beneficial : bacteriaColors.neutral
            }} />}
            {bacteria.trend === 'stable' && <Minus size={10} style={{ color: bacteriaColors.neutral }} />}
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-white/70 font-space whitespace-nowrap">
            {bacteria.name}
          </div>
          <div className="text-xs text-white/50">
            {bacteria.percentage}%
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Central Information Hub - Better positioning */}
      <motion.div
        className="absolute z-20 w-56 h-56 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.05 }}
      >
        <OrganicContainer 
          variant="microbiome" 
          glow 
          pulse 
          className="w-full h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-bio-green-400/10 to-probiotic-400/10 border-2 border-bio-green-400/30"
        >
          <div className="w-12 h-12 bg-bio-green-400/20 rounded-full flex items-center justify-center mb-3">
            <Microscope size={28} className="text-bio-green-400" />
          </div>
          <div className="text-2xl font-clash font-bold text-white mb-2">
            Microbiome
          </div>
          <div className="text-3xl font-bold text-bio-green-400 mb-2">
            {mockMicrobiomeData.diversity}%
          </div>
          <div className="text-sm text-white/70">
            Diversity Score
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Background particles for living effect */}
      <MicrobiomeParticles count={30} />

      {/* Concentric rings - Better visibility */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border rounded-full pointer-events-none"
          style={{
            width: 250 + ring * 120,
            height: 250 + ring * 120,
            borderColor: `rgba(${ring % 2 === 0 ? '0, 255, 136' : '74, 144, 226'}, ${0.15 - ring * 0.03})`,
            borderWidth: 2,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: ring % 2 === 0 ? 360 : -360,
          }}
          transition={{
            opacity: { duration: 1, delay: ring * 0.2 },
            scale: { duration: 1, delay: ring * 0.2 },
            rotate: { duration: 30 + ring * 10, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}

      {/* Bacteria colonies */}
      {mockMicrobiomeData.bacteria.map((bacteria, index) => 
        renderBacteriaColony(bacteria, index)
      )}

      {/* Legend */}
      <motion.div
        className="absolute top-8 left-8 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <OrganicContainer variant="organic" size="sm">
          <h4 className="text-white font-semibold mb-3">Bacteria Types</h4>
          <div className="space-y-2">
            {Object.entries(bacteriaColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white/70 text-sm capitalize">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Recommendations Panel */}
      <motion.div
        className="absolute bottom-8 right-8 z-30 max-w-md"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <OrganicContainer variant="blob" glow size="md">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Info size={16} />
            Recommendations
          </h4>
          <div className="space-y-3">
            {mockMicrobiomeData.recommendations.slice(0, 2).map((rec, index) => (
              <motion.div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-sm text-white/90">
                  {rec.description}
                </div>
                <div className={`text-xs mt-1 ${
                  rec.priority === 'high' ? 'text-enzyme-400' : 'text-bio-green-400'
                }`}>
                  {rec.priority.toUpperCase()} PRIORITY
                </div>
              </motion.div>
            ))}
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Bacteria Detail Modal */}
      <AnimatePresence>
        {selectedBacteria && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBacteria(null)}
          >
            <motion.div
              className="w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <OrganicContainer variant="organic" glow size="lg">
                <div className="space-y-4 text-center">
                  <div 
                    className="w-16 h-16 mx-auto rounded-xl"
                    style={{ backgroundColor: bacteriaColors[selectedBacteria.type] }}
                  />
                  
                  <h3 className="text-2xl font-clash font-bold text-white">
                    {selectedBacteria.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/70">Percentage</div>
                      <div className="text-xl font-bold text-white">
                        {selectedBacteria.percentage}%
                      </div>
                    </div>
                    <div>
                      <div className="text-white/70">Type</div>
                      <div className="text-lg capitalize" style={{ color: bacteriaColors[selectedBacteria.type] }}>
                        {selectedBacteria.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white/70">Trend:</span>
                    <div className="flex items-center gap-1">
                      {selectedBacteria.trend === 'increasing' && <TrendingUp size={16} style={{ color: trendColors.increasing }} />}
                      {selectedBacteria.trend === 'decreasing' && <TrendingDown size={16} style={{ color: trendColors.decreasing }} />}
                      {selectedBacteria.trend === 'stable' && <Minus size={16} style={{ color: trendColors.stable }} />}
                      <span className="text-white capitalize">{selectedBacteria.trend}</span>
                    </div>
                  </div>
                  
                  <OrganicButton
                    variant="primary"
                    shape="organic"
                    onClick={() => setSelectedBacteria(null)}
                  >
                    Close
                  </OrganicButton>
                </div>
              </OrganicContainer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}