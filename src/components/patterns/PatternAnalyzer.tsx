'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Calendar, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

// Sample pattern data
const patterns = [
  {
    id: 1,
    type: 'correlation',
    title: 'Dairy → Bloating',
    confidence: 87,
    occurrences: 23,
    timeframe: '2 weeks',
    trend: 'increasing',
    severity: 'high',
    description: 'Strong correlation detected between dairy consumption and bloating episodes'
  },
  {
    id: 2,
    type: 'timing',
    title: 'Late Night Eating',
    confidence: 72,
    occurrences: 15,
    timeframe: '1 month',
    trend: 'stable',
    severity: 'medium',
    description: 'Eating after 9 PM correlates with morning digestive discomfort'
  },
  {
    id: 3,
    type: 'positive',
    title: 'Fermented Foods',
    confidence: 91,
    occurrences: 31,
    timeframe: '3 weeks',
    trend: 'improving',
    severity: 'positive',
    description: 'Fermented foods consistently improve your digestive comfort'
  },
  {
    id: 4,
    type: 'cycle',
    title: 'Weekly Pattern',
    confidence: 68,
    occurrences: 8,
    timeframe: '2 months',
    trend: 'stable',
    severity: 'low',
    description: 'Symptoms tend to worsen on weekends, possibly due to dietary changes'
  }
]

const timelineData = [
  { day: 'Mon', score: 75, symptoms: 2, meals: 4 },
  { day: 'Tue', score: 82, symptoms: 1, meals: 3 },
  { day: 'Wed', score: 68, symptoms: 3, meals: 4 },
  { day: 'Thu', score: 85, symptoms: 1, meals: 3 },
  { day: 'Fri', score: 72, symptoms: 2, meals: 5 },
  { day: 'Sat', score: 65, symptoms: 4, meals: 4 },
  { day: 'Sun', score: 78, symptoms: 2, meals: 3 }
]

export function PatternAnalyzer() {
  const [selectedPattern, setSelectedPattern] = useState<typeof patterns[0] | null>(null)
  const [activeView, setActiveView] = useState<'patterns' | 'timeline'>('patterns')

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/30'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30'
      case 'positive': return 'text-green-400 bg-green-400/10 border-green-400/30'
      default: return 'text-white/60 bg-white/5 border-white/20'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="text-red-400" size={16} />
      case 'improving': return <TrendingUp className="text-green-400" size={16} />
      case 'stable': return <Activity className="text-yellow-400" size={16} />
      default: return <TrendingDown className="text-blue-400" size={16} />
    }
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-32 pb-20 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-creative-heading font-bold text-white mb-4">
          Pattern Analysis
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Discover hidden connections in your health data
        </p>
      </motion.div>

      {/* View Toggle */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <OrganicContainer variant="organic" size="sm" className="bg-white/5 border-white/10">
          <div className="flex gap-2">
            <OrganicButton
              variant={activeView === 'patterns' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('patterns')}
              className={activeView === 'patterns' ? 'bg-white/10 border-white/30' : ''}
            >
              <AlertCircle size={16} className="mr-2" />
              Patterns
            </OrganicButton>
            <OrganicButton
              variant={activeView === 'timeline' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('timeline')}
              className={activeView === 'timeline' ? 'bg-white/10 border-white/30' : ''}
            >
              <Calendar size={16} className="mr-2" />
              Timeline
            </OrganicButton>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {activeView === 'patterns' ? (
            <motion.div
              key="patterns"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {patterns.map((pattern, index) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPattern(pattern)}
                  className="cursor-pointer"
                >
                  <OrganicContainer 
                    className={`p-6 hover:bg-white/10 transition-all duration-300 ${
                      selectedPattern?.id === pattern.id ? 'ring-2 ring-white/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(pattern.severity)}`}>
                          {pattern.type === 'positive' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{pattern.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getTrendIcon(pattern.trend)}
                            <span className="text-white/60 text-sm">{pattern.trend}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{pattern.confidence}%</div>
                        <div className="text-white/60 text-xs">confidence</div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4">{pattern.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Activity size={14} className="text-white/60" />
                          <span className="text-white/60">{pattern.occurrences} times</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-white/60" />
                          <span className="text-white/60">{pattern.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-bio-green-400 to-probiotic-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${pattern.confidence}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </OrganicContainer>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Weekly Overview */}
              <OrganicContainer className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Weekly Health Timeline</h3>
                
                <div className="grid grid-cols-7 gap-4">
                  {timelineData.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-center"
                    >
                      <div className="text-white/60 text-sm mb-2">{day.day}</div>
                      
                      {/* Score bar */}
                      <div className="relative h-32 w-full mb-2">
                        <div className="absolute bottom-0 w-full bg-white/10 rounded-t-lg">
                          <motion.div
                            className={`absolute bottom-0 w-full rounded-t-lg ${
                              day.score >= 80 ? 'bg-green-400' :
                              day.score >= 70 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            initial={{ height: 0 }}
                            animate={{ height: `${day.score}%` }}
                            transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-white font-bold">{day.score}</div>
                      <div className="text-white/40 text-xs">
                        {day.symptoms} symptoms
                      </div>
                    </motion.div>
                  ))}
                </div>
              </OrganicContainer>

              {/* Pattern Summary */}
              <OrganicContainer className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info size={20} className="text-bio-green-400" />
                  <h3 className="text-xl font-semibold text-white">Pattern Summary</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-green-400 text-2xl font-bold mb-1">3</div>
                    <div className="text-white/60 text-sm">Positive patterns</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-yellow-400 text-2xl font-bold mb-1">5</div>
                    <div className="text-white/60 text-sm">Triggers identified</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-blue-400 text-2xl font-bold mb-1">78%</div>
                    <div className="text-white/60 text-sm">Overall improvement</div>
                  </div>
                </div>
              </OrganicContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pattern Detail Modal */}
      <AnimatePresence>
        {selectedPattern && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPattern(null)}
          >
            <motion.div
              className="w-full max-w-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <OrganicContainer className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedPattern.title}</h2>
                <p className="text-white/80 mb-6">{selectedPattern.description}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Confidence Level</span>
                    <span className="text-white font-bold">{selectedPattern.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Occurrences</span>
                    <span className="text-white font-bold">{selectedPattern.occurrences}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Period</span>
                    <span className="text-white font-bold">{selectedPattern.timeframe}</span>
                  </div>
                </div>
                
                <OrganicButton
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => setSelectedPattern(null)}
                >
                  Close
                </OrganicButton>
              </OrganicContainer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}