'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getRandomOrganicColor } from '@/lib/utils'

interface Particle {
  id: string
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

interface CellularParticlesProps {
  count?: number
  maxSize?: number
  className?: string
}

export function CellularParticles({ 
  count = 20, 
  maxSize = 100,
  className = ''
}: CellularParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = (): Particle[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: `particle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * maxSize + 20,
        color: getRandomOrganicColor(),
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    }

    setParticles(generateParticles())
  }, [count, maxSize])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{
            scale: 0,
            opacity: 0,
            borderRadius: '50%',
          }}
          animate={{
            scale: [0, 1, 0.8, 1.2, 0],
            opacity: [0, 0.1, 0.15, 0.1, 0],
            borderRadius: [
              '50%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '70% 30% 60% 40% / 30% 70% 40% 60%',
              '50%'
            ],
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            rotate: [0, 180, 90, 270, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Microbiome visualization particles
export function MicrobiomeParticles({ 
  count = 50, 
  className = '' 
}: Pick<CellularParticlesProps, 'count' | 'className'>) {
  const [bacteria, setBacteria] = useState<Particle[]>([])

  useEffect(() => {
    const generateBacteria = (): Particle[] => {
      return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 2 * Math.PI
        const radius = Math.random() * 40 + 10
        const centerX = 50
        const centerY = 50
        
        return {
          id: `bacteria-${i}`,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: Math.random() * 8 + 4,
          color: i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#8B5CF6' : '#FF6B35',
          duration: Math.random() * 8 + 6,
          delay: Math.random() * 2,
        }
      })
    }

    setBacteria(generateBacteria())
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bacteria.map((bacterium, index) => (
        <motion.div
          key={bacterium.id}
          className="absolute"
          style={{
            left: `${bacterium.x}%`,
            top: `${bacterium.y}%`,
            width: bacterium.size,
            height: bacterium.size,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 1.2, 1],
            opacity: [0, 0.6, 0.8, 0.6],
            rotate: [0, 360],
            x: [0, Math.sin(index) * 20, 0],
            y: [0, Math.cos(index) * 20, 0],
          }}
          transition={{
            duration: bacterium.duration,
            delay: bacterium.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full blur-sm"
            style={{ backgroundColor: bacterium.color }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundColor: bacterium.color,
              filter: 'brightness(1.5)',
            }}
            animate={{
              scale: [1, 0.8, 1.1, 1],
              opacity: [0.8, 0.4, 0.9, 0.8],
            }}
            transition={{
              duration: bacterium.duration * 0.5,
              delay: bacterium.delay + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
      
      {/* Central nucleus */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-bio-green-400 to-probiotic-400 blur-sm" />
      </motion.div>
    </div>
  )
}