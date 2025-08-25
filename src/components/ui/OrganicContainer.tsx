'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface OrganicContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  variant?: 'cell' | 'blob' | 'organic' | 'microbiome'
  glow?: boolean
  pulse?: boolean
  morph?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glassMorphism?: boolean
}

export const OrganicContainer = forwardRef<HTMLDivElement, OrganicContainerProps>(
  ({ 
    children, 
    variant = 'organic', 
    glow = false, 
    pulse = false, 
    morph = false,
    size = 'md',
    glassMorphism = true,
    className,
    ...props 
  }, ref) => {
    const variants = {
      cell: 'rounded-2xl',
      blob: 'rounded-3xl', 
      organic: 'rounded-xl',
      microbiome: 'rounded-full'
    }

    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    }

    const baseClasses = cn(
      'relative overflow-hidden transition-all duration-700',
      variants[variant],
      sizes[size],
      {
        'glass-morphism': glassMorphism,
        'pulse-bio': pulse,
        'morph-organic': morph,
        'shadow-lg shadow-bio-green-400/20 border border-bio-green-400/30': glow
      },
      className
    )

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        {...props}
      >
        {glow && (
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-bio-green-400/10 to-probiotic-400/10 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {children}
      </motion.div>
    )
  }
)

OrganicContainer.displayName = 'OrganicContainer'