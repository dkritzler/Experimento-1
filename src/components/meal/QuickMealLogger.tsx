'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Search, Clock, Camera, Mic, Check, ChevronDown, X } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { useAppStore } from '@/store'
import type { Meal, PortionSize, MoodRating } from '@/types'

// Quick food suggestions based on time of day
const getQuickSuggestions = () => {
  const hour = new Date().getHours()
  
  if (hour < 11) {
    return ['Oatmeal', 'Yogurt', 'Eggs', 'Toast', 'Coffee', 'Banana']
  } else if (hour < 15) {
    return ['Salad', 'Sandwich', 'Soup', 'Chicken', 'Rice', 'Pasta']
  } else if (hour < 20) {
    return ['Salmon', 'Vegetables', 'Quinoa', 'Steak', 'Pizza', 'Curry']
  } else {
    return ['Tea', 'Fruit', 'Nuts', 'Dark Chocolate', 'Cheese', 'Crackers']
  }
}

const moodEmojis = ['😞', '😕', '😐', '🙂', '😊']
const portionSizes = ['Small', 'Medium', 'Large']

export function QuickMealLogger() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [portion, setPortion] = useState<PortionSize>('medium')
  const [mood, setMood] = useState<MoodRating>(3)
  const [notes, setNotes] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [suggestions] = useState(getQuickSuggestions())
  const { addMeal } = useAppStore()

  const handleAddFood = (food: string) => {
    if (!selectedFoods.includes(food)) {
      setSelectedFoods([...selectedFoods, food])
    }
    setSearchQuery('')
  }

  const handleRemoveFood = (food: string) => {
    setSelectedFoods(selectedFoods.filter(f => f !== food))
  }

  const handleSave = () => {
    if (selectedFoods.length === 0) return

    const meal: Meal = {
      id: `meal-${Date.now()}`,
      userId: 'current-user',
      timestamp: new Date(),
      foods: selectedFoods.map(food => ({
        food: {
          id: food.toLowerCase().replace(/\s+/g, '-'),
          name: food,
          category: 'grains', // Would be determined by AI/database
          allergens: [],
          nutritionalInfo: {
            calories: 200, // Mock data
            protein: 10,
            carbs: 30,
            fat: 5,
            fiber: 3,
            sugar: 5
          },
          commonTriggers: []
        },
        quantity: 1,
        unit: 'serving'
      })),
      portion,
      mood,
      notes
    }

    addMeal(meal)
    
    // Show success animation
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setIsOpen(false)
      // Reset form
      setSelectedFoods([])
      setPortion('medium')
      setMood(3)
      setNotes('')
    }, 2000)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <OrganicContainer 
          variant="blob" 
          size="sm"
          glow
          className="bg-gradient-to-br from-bio-green-400 to-probiotic-400 p-4"
        >
          <Plus size={24} className="text-white" />
        </OrganicContainer>
      </motion.button>

      {/* Logger Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
            >
              <OrganicContainer variant="organic" size="lg" glow>
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-creative-heading font-bold text-white mb-2">
                      Quick Meal Logger
                    </h2>
                    <p className="text-white/70 text-sm">
                      What did you eat? Select or search foods
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && searchQuery) {
                          handleAddFood(searchQuery)
                        }
                      }}
                      placeholder="Search or type food name..."
                      className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                      <button className="text-white/50 hover:text-white transition-colors">
                        <Camera size={18} />
                      </button>
                      <button className="text-white/50 hover:text-white transition-colors">
                        <Mic size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={16} className="text-white/60" />
                      <span className="text-white/60 text-sm">Quick add</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((food) => (
                        <motion.button
                          key={food}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddFood(food)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            selectedFoods.includes(food)
                              ? 'bg-bio-green-400/30 text-bio-green-400 border border-bio-green-400'
                              : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/15'
                          }`}
                        >
                          {food}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Foods */}
                  {selectedFoods.length > 0 && (
                    <div className="mb-6">
                      <div className="text-white/60 text-sm mb-3">Selected foods</div>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {selectedFoods.map((food) => (
                            <motion.div
                              key={food}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="bg-bio-green-400/20 text-bio-green-400 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-bio-green-400/30"
                            >
                              {food}
                              <button
                                onClick={() => handleRemoveFood(food)}
                                className="hover:text-white transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Portion Size */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-white/60 text-sm block mb-2">Portion Size</label>
                      <div className="flex gap-2">
                        {portionSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setPortion(size.toLowerCase() as PortionSize)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                              portion === size.toLowerCase()
                                ? 'bg-white/20 text-white border border-white/30'
                                : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/15'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mood */}
                    <div>
                      <label className="text-white/60 text-sm block mb-2">How do you feel?</label>
                      <div className="flex gap-2">
                        {moodEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => setMood((index + 1) as MoodRating)}
                            className={`flex-1 py-2 rounded-lg text-xl transition-all ${
                              mood === index + 1
                                ? 'bg-white/20 border border-white/30'
                                : 'bg-white/10 border border-white/20 hover:bg-white/15'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="text-white/60 text-sm block mb-2">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional details..."
                      className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all resize-none h-20"
                    />
                  </div>

                  {/* Save Button */}
                  <OrganicButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleSave}
                    disabled={selectedFoods.length === 0}
                  >
                    {showSuccess ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Saved Successfully!
                      </>
                    ) : (
                      'Log Meal'
                    )}
                  </OrganicButton>
                </div>
              </OrganicContainer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}