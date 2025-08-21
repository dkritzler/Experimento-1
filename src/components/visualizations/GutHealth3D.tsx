'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import type { HealthScore } from '@/types'

// Mock health score data
const mockHealthScore: HealthScore = {
  overall: 78,
  digestive: 82,
  inflammation: 65,
  microbiome: 89,
  trends: [
    { metric: 'Overall Health', change: 5, period: 'Last 30 days' },
    { metric: 'Digestive Health', change: -2, period: 'Last 7 days' },
    { metric: 'Inflammation', change: 12, period: 'Last 30 days' },
    { metric: 'Microbiome', change: 8, period: 'Last 14 days' },
  ],
  lastUpdated: new Date()
}

// Animated health visualization sphere
function HealthSphere({ score, metric, position }: { score: number; metric: string; position: { x: number; y: number } }) {
  const [hovered, setHovered] = useState(false)

  const getColor = (score: number) => {
    if (score >= 80) return '#00FF88' // Bio green
    if (score >= 60) return '#4A90E2' // Blue  
    return '#FFD700' // Yellow/Gold
  }

  const size = Math.max(80, score * 1.5)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: hovered ? 1.2 : 1,
        opacity: 1
      }}
      transition={{
        scale: { duration: 0.3 }
      }}
      whileHover={{ scale: 1.3, rotate: 360 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Main sphere */}
      <motion.div
        className="relative rounded-full flex items-center justify-center cursor-pointer"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${getColor(score)}CC, ${getColor(score)}80, ${getColor(score)}40)`,
          boxShadow: `0 0 40px ${getColor(score)}60, inset 0 0 20px ${getColor(score)}40`,
        }}
        animate={{
          boxShadow: [
            `0 0 40px ${getColor(score)}60, inset 0 0 20px ${getColor(score)}40`,
            `0 0 60px ${getColor(score)}80, inset 0 0 30px ${getColor(score)}60`,
            `0 0 40px ${getColor(score)}60, inset 0 0 20px ${getColor(score)}40`,
          ],
          y: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Score display */}
        <div className="text-center text-white">
          <div className="text-2xl font-creative-heading font-bold">{score}</div>
          <div className="text-xs font-creative-body opacity-80">{metric}</div>
        </div>

        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-60"
          style={{ borderColor: getColor(score) }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-40"
          style={{ borderColor: getColor(score) }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

// Floating health particles
function HealthParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#00FF88', '#4A90E2', '#FFD700'][Math.floor(Math.random() * 3)],
      size: Math.random() * 8 + 4,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color}80, ${particle.color}20)`,
            boxShadow: `0 0 20px ${particle.color}40`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export function GutHealth3D() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Header */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-creative-heading font-bold text-white mb-4">
          Health Patterns
        </h1>
        <p className="text-white/70 font-creative-body text-lg">
          Interactive visualization of your health metrics and trends
        </p>
      </motion.div>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #00FF8840, #4A90E240, #FFD70040)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, #00FF8840, #4A90E240, #FFD70040)',
            'radial-gradient(circle at 70% 70%, #4A90E240, #FFD70040, #00FF8840)',
            'radial-gradient(circle at 30% 30%, #00FF8840, #4A90E240, #FFD70040)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating particles */}
      <HealthParticles count={40} />

      {/* Central health visualization */}
      <div className="absolute top-32 left-0 right-0 bottom-16 flex items-center justify-center">
        {/* Main overall health sphere */}
        <HealthSphere 
          score={mockHealthScore.overall} 
          metric="Overall Health" 
          position={{ x: '50%', y: '50%' }} 
        />

        {/* Surrounding health metrics */}
        <HealthSphere 
          score={mockHealthScore.digestive} 
          metric="Digestive Health" 
          position={{ x: '30%', y: '30%' }} 
        />
        <HealthSphere 
          score={mockHealthScore.inflammation} 
          metric="Inflammation" 
          position={{ x: '70%', y: '30%' }} 
        />
        <HealthSphere 
          score={mockHealthScore.microbiome} 
          metric="Microbiome" 
          position={{ x: '30%', y: '70%' }} 
        />

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#4A90E2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.line
            x1="30%" y1="30%" x2="50%" y2="50%"
            stroke="url(#connectionGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.line
            x1="70%" y1="30%" x2="50%" y2="50%"
            stroke="url(#connectionGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="30%" y1="70%" x2="50%" y2="50%"
            stroke="url(#connectionGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Health Score Summary */}
      <motion.div
        className="absolute top-8 left-8 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <OrganicContainer variant="organic" glow size="sm">
          <div className="space-y-4">
            <h3 className="text-xl font-creative-heading font-bold text-white flex items-center gap-2">
              Gut Health Visualization
            </h3>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-bio-green-400">
                {mockHealthScore.overall}
              </div>
              <div className="text-sm text-white/70">
                Overall Score
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Digestive', value: mockHealthScore.digestive, color: '#00FF88' },
                { label: 'Inflammation', value: mockHealthScore.inflammation, color: '#4A90E2' },
                { label: 'Microbiome', value: mockHealthScore.microbiome, color: '#FFD700' },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-white/80 text-sm font-creative-body">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                    <span className="text-white font-semibold">
                      {metric.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Trends Panel */}
      <motion.div
        className="absolute top-32 right-8 z-30 max-w-sm"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <OrganicContainer variant="blob" glow size="md">
          <div className="space-y-4">
            <h4 className="text-white font-creative-heading font-semibold">Health Trends</h4>
            
            <div className="space-y-3">
              {mockHealthScore.trends.map((trend, index) => (
                <motion.div
                  key={trend.metric}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div>
                    <div className="text-sm text-white/90 font-creative-body">
                      {trend.metric}
                    </div>
                    <div className="text-xs text-white/60">
                      {trend.period}
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    trend.change > 0 ? 'text-bio-green-400' : 'text-enzyme-400'
                  }`}>
                    {trend.change > 0 ? '+' : ''}{trend.change}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-xs text-white/60 text-center font-creative-body">
              Last updated: {mockHealthScore.lastUpdated.toLocaleDateString()}
            </div>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-6 py-4">
          <div className="text-center text-white/70 text-sm space-y-2 font-creative-body">
            <div className="text-white font-semibold mb-2">How to Use</div>
            <div>• Hover over spheres to see detailed metrics</div>
            <div>• Larger spheres indicate better scores</div>
            <div>• Colors represent different health areas</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}