'use client'

import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useState, useRef } from 'react'
import { Plus, Trash2, Clock, AlertCircle, Apple, Coffee, Utensils, Save, Banana, Beef, Cookie, Milk, Pizza, Salad, Wheat, Sandwich, Soup, Carrot, Wind, Frown, Zap, BatteryLow, Brain, Heart, User } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

import { useAppStore } from '@/store'
import type { Food, Symptom, SymptomType, SeverityLevel, PortionSize, MoodRating } from '@/types'

interface DraggedItem {
  id: string
  type: 'food' | 'symptom'
  data: any
  position: { x: number; y: number }
}

const foodLibrary = [
  { id: 'apple', name: 'Apple', icon: Apple, category: 'fruits', color: '#ff6b6b' },
  { id: 'bread', name: 'Bread', icon: Wheat, category: 'grains', color: '#feca57' },
  { id: 'milk', name: 'Milk', icon: Milk, category: 'dairy', color: '#48dbfb' },
  { id: 'cheese', name: 'Cheese', icon: Cookie, category: 'dairy', color: '#ff9ff3' },
  { id: 'coffee', name: 'Coffee', icon: Coffee, category: 'beverages', color: '#a55eea' },
  { id: 'pizza', name: 'Pizza', icon: Pizza, category: 'processed', color: '#fd79a8' },
  { id: 'salad', name: 'Salad', icon: Salad, category: 'vegetables', color: '#00d2d3' },
  { id: 'chicken', name: 'Chicken', icon: Beef, category: 'proteins', color: '#ff7675' },
  { id: 'pasta', name: 'Pasta', icon: Soup, category: 'grains', color: '#fdcb6e' },
  { id: 'yogurt', name: 'Yogurt', icon: Milk, category: 'dairy', color: '#6c5ce7' },
]

const symptomLibrary = [
  { id: 'bloating', name: 'Bloating', icon: User, color: '#FF6B35' },
  { id: 'gas', name: 'Gas', icon: Wind, color: '#FF8C42' },
  { id: 'stomach_pain', name: 'Stomach Pain', icon: Frown, color: '#E55A2E' },
  { id: 'nausea', name: 'Nausea', icon: Zap, color: '#D2691E' },
  { id: 'fatigue', name: 'Fatigue', icon: BatteryLow, color: '#8B5CF6' },
  { id: 'headache', name: 'Headache', icon: Brain, color: '#A78BFA' },
  { id: 'skin_issues', name: 'Skin Issues', icon: AlertCircle, color: '#7C3AED' },
  { id: 'mood_changes', name: 'Mood Changes', icon: Heart, color: '#6366F1' },
]

interface LogEntry {
  id: string
  timestamp: Date
  foods: any[]
  symptoms: any[]
  notes: string
  mood: MoodRating
}

function DraggableItem({ 
  item, 
  type, 
  onDragStart, 
  onDragEnd 
}: { 
  item: any
  type: 'food' | 'symptom'
  onDragStart: (item: any, type: 'food' | 'symptom') => void
  onDragEnd: () => void
}) {


  return (
    <motion.div
      
      className="cursor-grab active:cursor-grabbing"
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      onDragStart={() => onDragStart(item, type)}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.05, y: -2 }}
      whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
    >
      <OrganicContainer 
        variant="blob" 
        size="sm"
        className="flex items-center gap-2 min-w-[120px] hover:shadow-lg transition-all duration-300"
        style={{
          borderColor: type === 'symptom' ? item.color : item.color || '#00FF88',
          backgroundColor: type === 'symptom' ? `${item.color}10` : `${item.color || '#00FF88'}10`
        }}
      >
        <item.icon size={20} style={{ color: item.color || '#00FF88' }} />
        <span className="text-white text-sm font-medium">{item.name}</span>
      </OrganicContainer>
    </motion.div>
  )
}

function DropZone({ 
  title, 
  icon, 
  items, 
  onDrop, 
  onRemove,
  color 
}: {
  title: string
  icon: React.ReactNode
  items: any[]
  onDrop: (e: React.DragEvent) => void
  onRemove: (id: string) => void
  color: string
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <motion.div
      className={`relative min-h-[200px] border-2 border-dashed rounded-xl p-4 transition-all duration-300 bg-white/25 backdrop-blur-md ${
        isDragOver ? 'border-white/60 bg-white/35' : 'border-white/50'
      }`}
      style={{ borderColor: isDragOver ? color : undefined }}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        onDrop(e)
        setIsDragOver(false)
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-white font-semibold">{title}</h3>
        <span className="text-white/50 text-sm">({items.length})</span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="flex items-center justify-between bg-white/25 backdrop-blur-sm rounded-lg p-2 border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <item.icon size={16} style={{ color: item.color || '#00FF88' }} />
                <span className="text-white text-sm">{item.name}</span>
                {item.severity && (
                  <div className="flex">
                    {Array.from({ length: item.severity }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-enzyme-400 mr-1" />
                    ))}
                  </div>
                )}
              </div>
              <motion.button
                onClick={() => onRemove(item.id)}
                className="text-white/50 hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <motion.div
            className="text-center text-white/50 py-8"
            animate={{
              opacity: isDragOver ? 0.8 : 0.3,
              scale: isDragOver ? 1.05 : 1
            }}
          >
            <Plus size={32} className="mx-auto mb-2 text-white/30" />
            <div className="text-sm">Drag items here</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function SeverityPicker({ 
  isOpen, 
  onSelect, 
  onClose 
}: {
  isOpen: boolean
  onSelect: (severity: SeverityLevel) => void
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <OrganicContainer variant="organic" glow size="md">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Symptom Severity</h3>
                <p className="text-white/70 text-sm">How intense is this symptom?</p>
                
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((severity) => (
                    <motion.button
                      key={severity}
                      className="aspect-square rounded-lg bg-white/10 flex items-center justify-center text-white font-bold"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 107, 53, 0.3)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSelect(severity as SeverityLevel)}
                    >
                      {severity}
                    </motion.button>
                  ))}
                </div>
                
                <div className="text-xs text-white/60 space-y-1">
                  <div>1 = Mild • 3 = Moderate • 5 = Severe</div>
                </div>
              </div>
            </OrganicContainer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FoodSymptomLogger() {
  const [loggedFoods, setLoggedFoods] = useState<any[]>([])
  const [loggedSymptoms, setLoggedSymptoms] = useState<any[]>([])
  const [notes, setNotes] = useState('')
  const [mood, setMood] = useState<MoodRating>(3)
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null)
  const [showSeverityPicker, setShowSeverityPicker] = useState(false)
  const [pendingSymptom, setPendingSymptom] = useState<any>(null)
  const { addMeal, addSymptom } = useAppStore()

  const handleDragStart = (item: any, type: 'food' | 'symptom') => {
    setDraggedItem({
      id: item.id,
      type,
      data: item,
      position: { x: 0, y: 0 }
    })
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleFoodDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem && draggedItem.type === 'food') {
      const newFood = {
        ...draggedItem.data,
        id: `${draggedItem.data.id}-${Date.now()}`,
        timestamp: new Date(),
        portion: 'medium' as PortionSize
      }
      setLoggedFoods(prev => [...prev, newFood])
    }
  }

  const handleSymptomDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem && draggedItem.type === 'symptom') {
      setPendingSymptom(draggedItem.data)
      setShowSeverityPicker(true)
    }
  }

  const handleSeveritySelect = (severity: SeverityLevel) => {
    if (pendingSymptom) {
      const newSymptom = {
        ...pendingSymptom,
        id: `${pendingSymptom.id}-${Date.now()}`,
        timestamp: new Date(),
        severity,
        duration: 30 // Default 30 minutes
      }
      setLoggedSymptoms(prev => [...prev, newSymptom])
    }
    setShowSeverityPicker(false)
    setPendingSymptom(null)
  }

  const removeFoodItem = (id: string) => {
    setLoggedFoods(prev => prev.filter(item => item.id !== id))
  }

  const removeSymptomItem = (id: string) => {
    setLoggedSymptoms(prev => prev.filter(item => item.id !== id))
  }

  const handleSave = () => {
    // Save meal if foods are logged
    if (loggedFoods.length > 0) {
      const meal = {
        id: `meal-${Date.now()}`,
        userId: 'current-user',
        timestamp: new Date(),
        foods: loggedFoods.map(food => ({
          food: {
            id: food.id,
            name: food.name,
            category: food.category,
            allergens: [],
            nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
            commonTriggers: []
          },
          quantity: 1,
          unit: 'serving'
        })),
        portion: 'medium' as PortionSize,
        notes,
        mood,
      }
      addMeal(meal)
    }

    // Save symptoms
    loggedSymptoms.forEach(symptom => {
      const symptomEntry = {
        id: symptom.id,
        userId: 'current-user',
        timestamp: symptom.timestamp,
        type: symptom.id as SymptomType,
        severity: symptom.severity,
        duration: symptom.duration,
        notes,
      }
      addSymptom(symptomEntry)
    })

    // Reset form
    setLoggedFoods([])
    setLoggedSymptoms([])
    setNotes('')
    setMood(3)
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-creative-heading font-bold text-white mb-2">
            Detailed Food & Symptom Logger
          </h1>
          <p className="text-white/70 font-creative-body">
            Drag foods and symptoms to track your digestive patterns with precision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Library */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <OrganicContainer variant="organic" size="md" className="bg-white/30 backdrop-blur-md border-white/40">
              <div className="flex items-center gap-2 mb-4">
                <Apple className="text-bio-green-400" size={20} />
                <h2 className="text-white font-semibold">Food Library</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {foodLibrary.map((food) => (
                  <DraggableItem
                    key={food.id}
                    item={food}
                    type="food"
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </OrganicContainer>
          </motion.div>

          {/* Logging Area */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Foods Drop Zone */}
            <DropZone
              title="Today's Foods"
              icon={<Utensils className="text-bio-green-400" size={20} />}
              items={loggedFoods}
              onDrop={handleFoodDrop}
              onRemove={removeFoodItem}
              color="#00FF88"
            />

            {/* Symptoms Drop Zone */}
            <DropZone
              title="Symptoms"
              icon={<AlertCircle className="text-enzyme-400" size={20} />}
              items={loggedSymptoms}
              onDrop={handleSymptomDrop}
              onRemove={removeSymptomItem}
              color="#FF6B35"
            />

            {/* Notes & Mood */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border border-white/40 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How are you feeling? Any additional details..."
                    className="input-organic w-full h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Mood (1-5)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        className={`w-8 h-8 rounded-full border-2 ${
                          mood === rating 
                            ? 'border-bio-green-400 bg-bio-green-400/20' 
                            : 'border-white/30'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMood(rating as MoodRating)}
                      >
                        <span className="text-white text-sm">{rating}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <OrganicButton
                  variant="primary"
                  shape="organic"
                  className="w-full"
                  onClick={handleSave}
                  disabled={loggedFoods.length === 0 && loggedSymptoms.length === 0}
                >
                  <Save size={16} className="mr-2" />
                  Save Entry
                </OrganicButton>
              </div>
            </div>
          </motion.div>

          {/* Symptom Library */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <OrganicContainer variant="organic" size="md" className="bg-white/30 backdrop-blur-md border-white/40">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-enzyme-400" size={20} />
                <h2 className="text-white font-semibold">Symptoms</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {symptomLibrary.map((symptom) => (
                  <DraggableItem
                    key={symptom.id}
                    item={symptom}
                    type="symptom"
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </OrganicContainer>
          </motion.div>
        </div>
      </div>

      {/* Severity Picker Modal */}
      <SeverityPicker
        isOpen={showSeverityPicker}
        onSelect={handleSeveritySelect}
        onClose={() => {
          setShowSeverityPicker(false)
          setPendingSymptom(null)
        }}
      />
    </div>
  )
}