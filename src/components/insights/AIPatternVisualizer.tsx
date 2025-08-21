'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Brain, MessageCircle, Send, TrendingUp, TrendingDown, AlertTriangle, X } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

// Simplified health data for easier understanding
const healthMetrics = [
  { name: 'Digestive Health', score: 82, trend: 'up', color: '#00FF88' },
  { name: 'Energy Levels', score: 75, trend: 'stable', color: '#4A90E2' },
  { name: 'Sleep Quality', score: 68, trend: 'down', color: '#FFD700' },
  { name: 'Stress Level', score: 45, trend: 'down', color: '#FF6B35' }
]

const insights = [
  {
    title: 'Gluten Sensitivity Pattern',
    confidence: 92,
    description: 'Your symptoms appear 2-3 hours after consuming gluten',
    recommendation: 'Try a 2-week gluten elimination',
    type: 'warning'
  },
  {
    title: 'Dairy Intolerance',
    confidence: 78,
    description: 'Bloating occurs 1-2 hours after dairy consumption',
    recommendation: 'Consider lactase supplements or alternatives',
    type: 'warning'
  },
  {
    title: 'Positive Pattern',
    confidence: 85,
    description: 'Probiotic foods consistently improve your symptoms',
    recommendation: 'Continue including fermented foods in your diet',
    type: 'positive'
  }
]

// Health coach chatbot responses
const chatResponses = {
  greeting: "Hi! I'm Dr. Luna, your AI health coach. How can I help you understand your gut health patterns today?",
  patterns: "Based on your data, I've identified some interesting patterns. Would you like me to explain your digestive triggers or suggest some dietary adjustments?",
  gluten: "I notice gluten might be causing issues. Gluten sensitivity affects many people. Would you like a personalized elimination plan?",
  dairy: "Dairy intolerance is quite common. I can suggest some delicious alternatives that might work better for your gut.",
  improvements: "Great question! Based on your patterns, I'd recommend starting with small changes like adding more fiber and reducing processed foods.",
  general: "I'm here to help you understand your health data. Feel free to ask about any symptoms, food triggers, or health goals!"
}

export function AIPatternVisualizer() {
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', message: chatResponses.greeting }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    
    // Add user message
    const newMessages = [...chatMessages, { role: 'user', message: inputMessage }]
    
    // Simple AI response logic
    let response = chatResponses.general
    if (inputMessage.toLowerCase().includes('gluten')) {
      response = chatResponses.gluten
    } else if (inputMessage.toLowerCase().includes('dairy')) {
      response = chatResponses.dairy
    } else if (inputMessage.toLowerCase().includes('pattern')) {
      response = chatResponses.patterns
    } else if (inputMessage.toLowerCase().includes('improve')) {
      response = chatResponses.improvements
    }
    
    // Add AI response after a delay
    setTimeout(() => {
      setChatMessages([...newMessages, { role: 'assistant', message: response }])
    }, 1000)
    
    setChatMessages(newMessages)
    setInputMessage('')
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 120, -60, 0],
            y: [0, -70, 40, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-bio-green-400/10 rounded-3xl filter blur-lg"
        />
        
        <motion.div
          animate={{ 
            x: [0, -100, 50, 0],
            y: [0, 80, -30, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.6, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-400/10 rounded-2xl filter blur-lg"
        />
        
        <motion.div
          animate={{ 
            x: [0, 60, -90, 0],
            y: [0, -50, 25, 0],
            rotate: [0, 90, 270, 360],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-yellow-400/8 rounded-full filter blur-md"
        />
      </div>
      {/* Header */}
      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-creative-heading font-bold text-white mb-2">
          AI Health Insights
        </h1>
        <p className="text-white/70 font-creative-body text-base">
          Understanding your patterns with artificial intelligence
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="absolute top-20 left-0 right-0 bottom-0 p-2">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 h-full">
          
          {/* Left Column - Health Metrics Chart */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 h-full">
              <h3 className="text-xl font-creative-heading font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="text-bio-green-400" size={28} />
                Health Score Dashboard
              </h3>
              
              {/* Simplified Bar Chart */}
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-creative-body">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{metric.score}</span>
                        {metric.trend === 'up' && <TrendingUp size={16} className="text-green-400" />}
                        {metric.trend === 'down' && <TrendingDown size={16} className="text-red-400" />}
                        {metric.trend === 'stable' && <span className="w-4 h-0.5 bg-yellow-400 rounded"></span>}
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <motion.div
                        className="h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score}%` }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-bio-green-400">23</div>
                  <div className="text-white/60 text-sm">Insights Generated</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">89%</div>
                  <div className="text-white/60 text-sm">Pattern Accuracy</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Insights */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {/* AI Insights */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3">
              <h3 className="text-lg font-creative-heading font-bold text-white mb-3">
                Pattern Recognition
              </h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className={insight.type === 'positive' ? 'text-green-400' : 'text-yellow-400'} />
                      <div className="flex-1">
                        <h4 className="font-creative-heading font-semibold text-white mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-white/70 text-sm mb-2">
                          {insight.description}
                        </p>
                        <p className="text-bio-green-400 text-sm">
                          {insight.recommendation}
                        </p>
                        <div className="text-white/50 text-xs mt-2">
                          {insight.confidence}% confidence
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Health Coach Chatbot */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <OrganicButton
                variant="primary"
                size="lg"
                onClick={() => setShowChat(true)}
                className="w-full justify-center"
              >
                <MessageCircle size={20} />
                Chat with Dr. Luna (AI Health Coach)
              </OrganicButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowChat(false)}
          >
            <motion.div
              className="w-full max-w-lg mx-4 h-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-bio-green-400 to-blue-400 rounded-full flex items-center justify-center">
                      <Brain size={20} className="text-black" />
                    </div>
                    <div>
                      <h3 className="font-creative-heading font-bold text-white">Dr. Luna</h3>
                      <p className="text-white/60 text-sm">AI Health Coach</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowChat(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-bio-green-400 text-black'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about your health patterns..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-bio-green-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="w-10 h-10 bg-bio-green-400 rounded-xl flex items-center justify-center text-black hover:bg-bio-green-500 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    {['Explain patterns', 'Gluten help', 'Improve digestion'].map((action) => (
                      <button
                        key={action}
                        onClick={() => setInputMessage(action)}
                        className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-white/70 text-xs hover:bg-white/10 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
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