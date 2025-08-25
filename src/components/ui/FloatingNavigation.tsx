'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Home, PlusCircle, BarChart3, User, Brain, Activity, Settings } from 'lucide-react'
import { useNavigationStore } from '@/store'
import { cn, organicTransition } from '@/lib/utils'

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', angle: 0, href: '/' },
  { id: 'logger', icon: PlusCircle, label: 'Log Meal', angle: 60, href: '/logger' },
  { id: 'insights', icon: Brain, label: 'AI Insights', angle: 120, href: '/insights' },
  { id: 'patterns', icon: BarChart3, label: 'Patterns', angle: 180, href: '/health-3d' },
  { id: 'microbiome', icon: Activity, label: 'Microbiome', angle: 240, href: '/microbiome' },
  { id: 'recipes', icon: User, label: 'Recipes & Products', angle: 300, href: '/recommendations' },
  { id: 'account', icon: Settings, label: 'Account', angle: 360, href: '/account' },
]

export function FloatingNavigation() {
  const { isMenuOpen, toggleMenu, activeMenuItem, setActiveMenuItem } = useNavigationStore()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const radius = 120
  const centerSize = 64

  const calculatePosition = (angle: number, distance: number) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * distance,
      y: Math.sin(radian) * distance,
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Center Hub */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={toggleMenu}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            "glass-morphism border-2 transition-all duration-500",
            isMenuOpen 
              ? "border-enzyme-400 bg-enzyme-400/10" 
              : "border-bio-green-400 bg-bio-green-400/10"
          )}
          animate={{
            rotate: isMenuOpen ? 135 : 0,
            backgroundColor: isMenuOpen 
              ? 'rgba(255, 107, 53, 0.1)' 
              : 'rgba(0, 255, 136, 0.1)',
          }}
          transition={organicTransition}
        >
          <motion.div
            className="w-6 h-6 relative flex items-center justify-center"
            animate={{
              scale: isMenuOpen ? 0.8 : 1,
            }}
          >
            <motion.span
              className={cn(
                "absolute w-full h-0.5 bg-white rounded-full",
                "origin-center transition-all duration-300"
              )}
              style={{ top: '8px' }}
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 4 : 0,
              }}
            />
            <motion.span
              className={cn(
                "absolute w-full h-0.5 bg-white rounded-full",
                "origin-center transition-all duration-300"
              )}
              style={{ top: '12px' }}
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scale: isMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              className={cn(
                "absolute w-full h-0.5 bg-white rounded-full",
                "origin-center transition-all duration-300"
              )}
              style={{ top: '16px' }}
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -4 : 0,
              }}
            />
          </motion.div>
        </motion.button>


        {/* Navigation Items - Vertical Stack */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute bottom-20 right-0 flex flex-col-reverse gap-2 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => {
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-3"
                    initial={{ 
                      scale: 0, 
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{ 
                      scale: 0, 
                      opacity: 0,
                      x: 20,
                    }}
                    transition={{
                      ...organicTransition,
                      delay: index * 0.05 + 0.1,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Label */}
                    <motion.div
                      className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg text-white text-sm font-medium whitespace-nowrap border border-white/10"
                      whileHover={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        borderColor: 'rgba(0, 255, 136, 0.3)'
                      }}
                    >
                      {item.label}
                    </motion.div>

                    {/* Icon Button */}
                    <motion.button
                      onClick={() => {
                        setActiveMenuItem(item.id)
                        toggleMenu()
                        window.location.href = item.href
                      }}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        "glass-morphism border transition-all duration-300",
                        activeMenuItem === item.id
                          ? "border-enzyme-400 bg-enzyme-400/20"
                          : "border-bio-green-400/50 bg-bio-green-400/10"
                      )}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: activeMenuItem === item.id 
                          ? 'rgba(255, 107, 53, 0.3)' 
                          : 'rgba(0, 255, 136, 0.2)'
                      }}
                    >
                      <Icon 
                        size={18} 
                        className={cn(
                          "transition-colors duration-300",
                          activeMenuItem === item.id
                            ? "text-enzyme-400"
                            : "text-bio-green-400"
                        )}
                      />
                    </motion.button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Blur */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}