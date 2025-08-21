'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Plus, Coffee, Utensils, Cookie, Moon } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

import { useAppStore } from '@/store'
import type { Meal, PortionSize, MoodRating } from '@/types'

interface TimePoint {
  hour: number
  minute: number
  angle: number
  radius: number
  id: string
  meal?: Meal
}

const mealTypes = [
  { id: 'breakfast', icon: Coffee, label: 'Breakfast', color: '#FF8C42' },
  { id: 'lunch', icon: Utensils, label: 'Lunch', color: '#00FF88' },
  { id: 'dinner', icon: Utensils, label: 'Dinner', color: '#8B5CF6' },
  { id: 'snack', icon: Cookie, label: 'Snack', color: '#A78BFA' },
]

export function TimeSpiralLogger() {
  const [selectedTime, setSelectedTime] = useState<TimePoint | null>(null)
  const [showMealForm, setShowMealForm] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [draggedMeal, setDraggedMeal] = useState<string | null>(null)
  const spiralRef = useRef<HTMLDivElement>(null)

  const { addMeal, meals } = useAppStore()

  // Generate time points in spiral pattern
  const generateTimeSpiral = (): TimePoint[] => {
    const points: TimePoint[] = []
    const totalHours = 24
    const spiralTurns = 2
    const centerRadius = 100
    const maxRadius = 250

    for (let hour = 0; hour < totalHours; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const progress = (hour * 60 + minute) / (totalHours * 60)
        const angle = progress * spiralTurns * 2 * Math.PI
        const radius = centerRadius + (maxRadius - centerRadius) * progress
        
        points.push({
          hour,
          minute,
          angle,
          radius,
          id: `${hour}-${minute}`,
          meal: meals.find(m => {
            const mealTime = new Date(m.timestamp)
            return mealTime.getHours() === hour && 
                   Math.floor(mealTime.getMinutes() / 15) * 15 === minute
          })
        })
      }
    }

    return points
  }

  const [timePoints] = useState(generateTimeSpiral())

  const handleMealDrop = (timePoint: TimePoint, mealType: string) => {
    const today = new Date()
    const mealTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), timePoint.hour, timePoint.minute)
    
    const newMeal: Meal = {
      id: `meal-${Date.now()}`,
      userId: 'current-user',
      timestamp: mealTime,
      foods: [], // Will be populated in detailed form
      portion: 'medium' as PortionSize,
      mood: 3 as MoodRating,
      notes: `${mealTypes.find(m => m.id === mealType)?.label} at ${timePoint.hour}:${timePoint.minute.toString().padStart(2, '0')}`
    }

    addMeal(newMeal)
    setDraggedMeal(null)
  }

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black/5">
      {/* Central Hub */}
      <motion.div

        className="absolute z-20 w-32 h-32 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        <OrganicContainer 
          variant="microbiome" 
          glow 
          pulse 
          className="w-full h-full flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-2xl font-clash font-bold text-white">
              TODAY
            </div>
            <div className="text-sm text-white/70">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Time Spiral */}
      <div ref={spiralRef} className="relative w-full h-full">
        {timePoints.map((point, index) => {
          const x = Math.cos(point.angle) * point.radius
          const y = Math.sin(point.angle) * point.radius
          const isMainHour = point.minute === 0
          
          return (
            <motion.div
              key={point.id}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.round(x * 100) / 100}px)`,
                top: `calc(50% + ${Math.round(y * 100) / 100}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: isMainHour ? 1 : 0.6,
              }}
              transition={{ 
                delay: index * 0.01,
                duration: 0.5 
              }}
              whileHover={{ scale: isMainHour ? 1.3 : 1.1 }}
            >
              {/* Time Point */}
              <motion.div
                className={`
                  w-${isMainHour ? '6' : '3'} h-${isMainHour ? '6' : '3'} 
                  rounded-full cursor-pointer
                  ${point.meal ? 'bg-enzyme-400' : 'bg-white/30'}
                  border-2 border-white/20
                `}
                onClick={() => {
                  setSelectedTime(point)
                  setShowMealForm(true)
                }}
                whileHover={{
                  backgroundColor: point.meal ? '#FF8C42' : '#00FF88',
                  scale: 1.2,
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  if (draggedMeal) {
                    handleMealDrop(point, draggedMeal)
                  }
                }}
              />

              {/* Time Label */}
              {isMainHour && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-xs text-white/70 text-center whitespace-nowrap font-space">
                    {formatTime(point.hour, point.minute)}
                  </div>
                </motion.div>
              )}

              {/* Meal Indicator */}
              {point.meal && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-4 h-4 rounded-full bg-enzyme-400 border-2 border-white shadow-lg" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Meal Type Palette */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <OrganicContainer variant="organic" glassMorphism size="sm">
          <div className="flex gap-4 justify-center items-center">
            {mealTypes.map((mealType) => {
              const Icon = mealType.icon
              return (
                <motion.div
                  key={mealType.id}
                  className="cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={() => setDraggedMeal(mealType.id)}
                  onDragEnd={() => setDraggedMeal(null)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileDrag={{ scale: 1.2, rotate: 10 }}
                >
                  <OrganicButton
                    variant="ghost"
                    shape="blob"
                    className="p-3"
                    style={{ borderColor: mealType.color }}
                  >
                    <Icon size={20} style={{ color: mealType.color }} />
                  </OrganicButton>
                </motion.div>
              )
            })}
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Quick Add Button */}
      <motion.div
        className="absolute top-8 right-8 z-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <OrganicButton
          variant="primary"
          shape="liquid"
          glow
          onClick={() => setShowQuickAdd(true)}
        >
          <Plus size={20} />
          Log Meal
        </OrganicButton>
      </motion.div>

      {/* Meal Form Modal */}
      <AnimatePresence>
        {showMealForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMealForm(false)}
          >
            <motion.div
              className="w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-creative-heading font-bold text-white text-center">
                    Log Your Meal
                  </h3>
                  
                  {selectedTime && (
                    <p className="text-center text-white/70 font-creative-body">
                      Time: {formatTime(selectedTime.hour, selectedTime.minute)}
                    </p>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {mealTypes.map((mealType) => {
                        const Icon = mealType.icon
                        return (
                          <motion.button
                            key={mealType.id}
                            className="p-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors flex flex-col items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (selectedTime) {
                                handleMealDrop(selectedTime, mealType.id)
                                setShowMealForm(false)
                              }
                            }}
                          >
                            <Icon size={24} style={{ color: mealType.color }} className="mb-2" />
                            <div className="text-sm font-creative-body">{mealType.label}</div>
                          </motion.button>
                        )
                      })}
                    </div>
                    
                    <div className="text-center">
                      <OrganicButton
                        variant="outline"
                        onClick={() => setShowMealForm(false)}
                      >
                        Cancel
                      </OrganicButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {showQuickAdd && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuickAdd(false)}
          >
            <motion.div
              className="w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-creative-heading font-bold text-white text-center">
                    Quick Meal Log
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {mealTypes.map((mealType) => {
                      const Icon = mealType.icon
                      return (
                        <motion.button
                          key={mealType.id}
                          className="p-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const now = new Date()
                            const newMeal = {
                              id: `meal-${Date.now()}`,
                              userId: 'current-user',
                              timestamp: now,
                              foods: [],
                              portion: 'medium' as PortionSize,
                              mood: 3 as MoodRating,
                              notes: `Quick logged ${mealType.label} at ${now.toLocaleTimeString()}`
                            }
                            addMeal(newMeal)
                            setShowQuickAdd(false)
                          }}
                        >
                          <Icon size={24} style={{ color: mealType.color }} className="mx-auto mb-2" />
                          <div className="text-sm font-creative-body">{mealType.label}</div>
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="text-center">
                    <OrganicButton
                      variant="outline"
                      onClick={() => setShowQuickAdd(false)}
                    >
                      Cancel
                    </OrganicButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}