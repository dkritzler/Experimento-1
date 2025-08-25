'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useAppStore } from '@/store'
import { calculateMagneticForce } from '@/lib/utils'

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { setCursor, magneticElements } = useAppStore()
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY })
      
      let magneticForce = { x: 0, y: 0 }
      
      // Check for magnetic interactions
      magneticElements.forEach(element => {
        if (element) {
          const rect = element.getBoundingClientRect()
          const force = calculateMagneticForce(rect, e.clientX, e.clientY, 0.15)
          magneticForce.x += force.x
          magneticForce.y += force.y
        }
      })
      
      cursorX.set(e.clientX + magneticForce.x)
      cursorY.set(e.clientY + magneticForce.y)
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magneticElements, setCursor, cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-bio-green-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-probiotic-400"
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9997] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-enzyme-400"
          animate={{
            scale: [0.3, 0.8, 0.3],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  )
}

// Hook for magnetic interaction
export function useMagnetic() {
  const { registerMagneticElement, unregisterMagneticElement } = useAppStore()
  
  const magneticRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = magneticRef.current
    if (element) {
      registerMagneticElement(element)
      
      return () => {
        unregisterMagneticElement(element)
      }
    }
  }, [registerMagneticElement, unregisterMagneticElement])

  return magneticRef
}