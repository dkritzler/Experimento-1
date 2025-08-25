'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { cn, organicTransition, liquidTransition } from '@/lib/utils'


interface OrganicButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'blob' | 'cell' | 'organic' | 'liquid'
  glow?: boolean
  ripple?: boolean

}

export const OrganicButton = forwardRef<HTMLButtonElement, OrganicButtonProps>(
  ({ 
    children,
    variant = 'primary',
    size = 'md',
    shape = 'organic',
    glow = false,
    ripple = true,

    className,
    ...props 
  }, ref) => {


    const variants = {
      primary: 'bg-gradient-to-r from-bio-green-400 to-probiotic-400 text-black border-transparent',
      secondary: 'bg-gradient-to-r from-enzyme-400 to-organic-400 text-white border-transparent',
      outline: 'bg-transparent text-white border-bio-green-400 hover:bg-bio-green-400/10',
      ghost: 'bg-transparent text-white border-transparent hover:bg-white/5'
    }

    const sizes = {
      sm: 'px-6 py-3 text-sm',
      md: 'px-8 py-4 text-base',
      lg: 'px-10 py-5 text-lg'
    }

    const shapes = {
      blob: 'rounded-2xl',
      cell: 'rounded-xl',
      organic: 'rounded-xl',
      liquid: 'rounded-full'
    }

    const baseClasses = cn(
      'relative overflow-hidden font-creative-button transition-all duration-500',
      'border-2 focus:outline-none focus:ring-4 focus:ring-bio-green-400/30',
      'transform-gpu will-change-transform',
      variants[variant],
      sizes[size],
      shapes[shape],
      {
        'shadow-lg shadow-bio-green-400/25': glow,
      },
      className
    )

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          transition: organicTransition
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        animate={{
          borderRadius: undefined
        }}
        transition={{
          borderRadius: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        {...props}
      >
        {/* Background gradient animation */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-probiotic-400 to-bio-green-400 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={liquidTransition}
          />
        )}

        {/* Ripple effect */}
        {ripple && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full scale-0"
            whileTap={{
              scale: [0, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Glow effect */}
        {glow && (
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-bio-green-400 to-probiotic-400 rounded-xl blur opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
            transition: { duration: 0.6 }
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    )
  }
)

OrganicButton.displayName = 'OrganicButton'