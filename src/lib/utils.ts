import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for organic animations and interactions
export const generateOrganicPath = (complexity: number = 5): string => {
  const points: string[] = []
  for (let i = 0; i <= complexity; i++) {
    const angle = (i / complexity) * 2 * Math.PI
    const radius = 50 + Math.random() * 30
    const x = 50 + radius * Math.cos(angle)
    const y = 50 + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }
  return `polygon(${points.join(' ')})`
}

export const generateCellularGradient = (colors: string[]): string => {
  if (colors.length < 2) return ''
  
  const stops = colors.map((color, index) => {
    const percentage = (index / (colors.length - 1)) * 100
    return `${color} ${percentage}%`
  }).join(', ')
  
  return `conic-gradient(from ${Math.random() * 360}deg, ${stops})`
}

export const calculateMagneticForce = (
  elementRect: DOMRect,
  cursorX: number,
  cursorY: number,
  strength: number = 0.3
): { x: number; y: number } => {
  const elementCenterX = elementRect.left + elementRect.width / 2
  const elementCenterY = elementRect.top + elementRect.height / 2
  
  const deltaX = cursorX - elementCenterX
  const deltaY = cursorY - elementCenterY
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  
  const maxDistance = 100
  if (distance > maxDistance) return { x: 0, y: 0 }
  
  const force = (maxDistance - distance) / maxDistance
  
  return {
    x: deltaX * force * strength,
    y: deltaY * force * strength
  }
}

export const organicTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
}

export const liquidTransition = {
  duration: 0.8,
  ease: [0.68, -0.55, 0.265, 1.55]
}

export const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export const morphingAnimation = {
  borderRadius: [
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "30% 60% 70% 40% / 50% 60% 30% 60%", 
    "70% 30% 60% 40% / 30% 70% 40% 60%",
    "60% 40% 30% 70% / 60% 30% 70% 40%"
  ],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

// Color utilities for organic themes
export const organicColors = {
  bioGreen: {
    400: '#00FF88',
    500: '#00CC66',
    600: '#00AA55',
  },
  probiotic: {
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
  },
  enzyme: {
    400: '#FF8C42',
    500: '#FF6B35',
    600: '#E55A2E',
  },
  organic: {
    400: '#D2691E',
    500: '#B8560F',
    600: '#8B4513',
  }
}

export const getRandomOrganicColor = (): string => {
  const colorFamilies = Object.values(organicColors)
  const randomFamily = colorFamilies[Math.floor(Math.random() * colorFamilies.length)]
  const shades = Object.values(randomFamily)
  return shades[Math.floor(Math.random() * shades.length)]
}