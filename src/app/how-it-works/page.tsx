'use client'

import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { ArrowLeft, Brain, Activity, BarChart3, User, PlusCircle, Home, Target, Utensils, Rocket, Edit3, Settings, Sparkles, HelpCircle, Zap, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background particles */}
        <CellularParticles count={10} />
        
        {/* Floating navigation */}
        <FloatingNavigation />
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 p-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.button
              onClick={() => window.location.href = '/'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </motion.button>
            
            <motion.h1 
              className="font-creative-heading text-3xl md:text-4xl font-bold text-white"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.5)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(0, 255, 136, 0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              How GutWise Works
            </motion.h1>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <motion.p 
              className="font-space text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover how our AI-powered platform revolutionizes digestive health tracking and microbiome optimization
            </motion.p>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
            >
              {[
                { number: "85%", label: "Accuracy Rate", icon: Target },
                { number: "500+", label: "Food Patterns", icon: Utensils },
                { number: "24/7", label: "AI Analysis", icon: Brain }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
                >
                  <div className="mb-2 flex justify-center">
                    <stat.icon size={24} className="text-bio-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-bio-green-400 mb-1">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Separator */}
          <div className="flex justify-center my-16">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-bio-green-400 to-transparent"></div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto justify-center"
          >
            {/* Feature 1: Smart Logging */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <OrganicContainer className="p-6 h-full w-full">
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlusCircle size={32} className="text-black" />
                  </div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-3">Smart Food Logging</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-center">
                    Log your meals and symptoms with our intuitive interface. Our AI learns your patterns and suggests correlations.
                  </p>
                </div>
              </OrganicContainer>
            </motion.div>

            {/* Feature 2: AI Pattern Detection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <OrganicContainer className="p-6 h-full w-full">
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain size={32} className="text-black" />
                  </div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-3">AI Pattern Detection</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-center">
                    Advanced machine learning algorithms identify hidden connections between your diet, symptoms, and health outcomes.
                  </p>
                </div>
              </OrganicContainer>
            </motion.div>


            {/* Feature 3: Microbiome Insights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <OrganicContainer className="p-6 h-full w-full">
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity size={32} className="text-black" />
                  </div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-3">Microbiome Insights</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-center">
                    Get detailed insights into your gut microbiome composition and how it relates to your overall health.
                  </p>
                </div>
              </OrganicContainer>
            </motion.div>

            {/* Feature 5: Personalized Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <OrganicContainer className="p-6 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-black" />
                  </div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-3">Personalized Recommendations</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Receive tailored dietary and lifestyle recommendations based on your unique health profile and goals.
                  </p>
                </div>
              </OrganicContainer>
            </motion.div>

            {/* Feature 6: Dashboard Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <OrganicContainer className="p-6 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home size={32} className="text-black" />
                  </div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-3">Comprehensive Dashboard</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    View all your health metrics in one place with our beautiful, intuitive dashboard interface.
                  </p>
                </div>
              </OrganicContainer>
            </motion.div>
          </motion.div>

          {/* Separator */}
          <div className="flex justify-center my-16">
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-probiotic-400 to-transparent"></div>
          </div>

          {/* How It Works Steps */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-creative-heading text-3xl font-bold text-white text-center mb-12">
              How It Works in 4 Simple Steps
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Sign Up & Onboard",
                  description: "Create your account and complete our comprehensive health assessment to establish your baseline.",
                  icon: Rocket
                },
                {
                  step: "2",
                  title: "Log Your Journey",
                  description: "Track your meals, symptoms, and daily activities using our intuitive logging interface.",
                  icon: Edit3
                },
                {
                  step: "3",
                  title: "AI Analysis",
                  description: "Our advanced AI analyzes your data to identify patterns, correlations, and health insights.",
                  icon: Brain
                },
                {
                  step: "4",
                  title: "Optimize & Thrive",
                  description: "Receive personalized recommendations and track your progress toward optimal gut health.",
                  icon: Sparkles
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center">
                      <item.icon size={32} className="text-black" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-bio-green-400 font-bold text-lg">{item.step}</span>
                      <h3 className="font-creative-heading text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Why & How Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Why GutWise */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <OrganicContainer className="p-8 h-full">
                  <h2 className="font-creative-heading text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <HelpCircle size={32} className="text-bio-green-400" />
                    Why GutWise?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-bio-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80">
                        <span className="font-semibold text-white">70% of immune system</span> lives in your gut - yet most people don't understand their digestive patterns
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-probiotic-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80">
                        <span className="font-semibold text-white">Food sensitivities affect 20% of population</span> but traditional tracking methods are incomplete and manual
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-enzyme-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80">
                        <span className="font-semibold text-white">Microbiome research shows</span> personalized nutrition is key to optimal health, not one-size-fits-all approaches
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4 mt-6">
                      <p className="text-bio-green-400 font-medium text-sm">
                        "The gut microbiome is as unique as a fingerprint. Understanding yours is the key to personalized health optimization." - Dr. Sarah Chen, Microbiome Research Institute
                      </p>
                    </div>
                  </div>
                </OrganicContainer>
              </motion.div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <OrganicContainer className="p-8 h-full">
                  <h2 className="font-creative-heading text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Settings size={32} className="text-bio-green-400" />
                    How It Works
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Smart Data Collection</h4>
                        <p className="text-white/70 text-sm">AI-powered logging captures not just what you eat, but when, how much, preparation methods, and environmental factors</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Pattern Recognition</h4>
                        <p className="text-white/70 text-sm">Machine learning algorithms analyze thousands of data points to identify correlations invisible to manual tracking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-bio-green-400 to-bio-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Personalized Insights</h4>
                        <p className="text-white/70 text-sm">Generate actionable recommendations based on your unique digestive profile and health goals</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-bio-green-400/10 to-probiotic-400/10 rounded-lg p-4 mt-6">
                      <p className="text-white font-medium text-sm flex items-center gap-2">
                        <Brain size={16} className="text-bio-green-400" />
                        AI continuously learns and improves recommendations as you provide more data
                      </p>
                    </div>
                  </div>
                </OrganicContainer>
              </motion.div>
            </div>
          </motion.section>

          {/* Separator */}
          <div className="flex justify-center my-16">
            <div className="w-36 h-px bg-gradient-to-r from-transparent via-enzyme-400 to-transparent"></div>
          </div>

          {/* Interface Examples Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-creative-heading text-3xl font-bold text-white text-center mb-12">
              See GutWise in Action
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <OrganicContainer className="p-6">
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-4">Dashboard Overview</h3>
                  <div className="bg-black/20 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-bio-green-400/20 rounded-lg p-3 text-center">
                        <div className="text-bio-green-400 text-2xl font-bold">85%</div>
                        <div className="text-white/60 text-xs">Gut Health Score</div>
                      </div>
                      <div className="bg-probiotic-400/20 rounded-lg p-3 text-center">
                        <div className="text-blue-400 text-2xl font-bold">12</div>
                        <div className="text-white/60 text-xs">Days Tracked</div>
                      </div>
                      <div className="bg-enzyme-400/20 rounded-lg p-3 text-center">
                        <div className="text-yellow-400 text-2xl font-bold">3</div>
                        <div className="text-white/60 text-xs">Patterns Found</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Today's Symptoms</span>
                        <span className="text-bio-green-400">Low</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Microbiome Diversity</span>
                        <span className="text-blue-400">Good</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Inflammation Markers</span>
                        <span className="text-yellow-400">Moderate</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">
                    Track your progress with real-time health metrics and personalized insights.
                  </p>
                </OrganicContainer>
              </motion.div>

              {/* Logger Preview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <OrganicContainer className="p-6">
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-4">Food & Symptom Logger</h3>
                  <div className="bg-black/20 rounded-lg p-4 mb-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-bio-green-400 rounded-full"></div>
                      <span className="text-white text-sm">Breakfast: Oatmeal with berries</span>
                      <span className="text-white/40 text-xs ml-auto">8:30 AM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-probiotic-400 rounded-full"></div>
                      <span className="text-white text-sm">Probiotic supplement</span>
                      <span className="text-white/40 text-xs ml-auto">9:00 AM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-enzyme-400 rounded-full"></div>
                      <span className="text-white text-sm">Mild bloating noted</span>
                      <span className="text-white/40 text-xs ml-auto">2:00 PM</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex items-center gap-2">
                        <PlusCircle size={16} className="text-bio-green-400" />
                        <span className="text-white/60 text-sm">Add new entry...</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">
                    Easily log meals, symptoms, and supplements with our intuitive interface.
                  </p>
                </OrganicContainer>
              </motion.div>

              {/* AI Insights Preview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <OrganicContainer className="p-6">
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-4">AI-Powered Insights</h3>
                  <div className="bg-black/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Brain size={20} className="text-blue-400 mt-1" />
                      <div>
                        <p className="text-white text-sm font-medium">Pattern Detected</p>
                        <p className="text-white/70 text-xs">Dairy products correlate with bloating 73% of the time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <BarChart3 size={20} className="text-bio-green-400 mt-1" />
                      <div>
                        <p className="text-white text-sm font-medium">Recommendation</p>
                        <p className="text-white/70 text-xs">Try lactose-free alternatives for 2 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Activity size={20} className="text-yellow-400 mt-1" />
                      <div>
                        <p className="text-white text-sm font-medium">Improvement</p>
                        <p className="text-white/70 text-xs">Energy levels increased by 15% this week</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">
                    Get personalized insights based on your unique health patterns.
                  </p>
                </OrganicContainer>
              </motion.div>

            </div>
          </motion.section>

          {/* Separator */}
          <div className="flex justify-center my-16">
            <div className="w-44 h-px bg-gradient-to-r from-transparent via-bio-green-400 to-transparent"></div>
          </div>

          {/* Interactive Demo Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-creative-heading text-3xl font-bold text-white text-center mb-12">
              Try a Sample Analysis
            </h2>
            
            <OrganicContainer className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sample Data Input */}
                <div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-6">Sample User Data</h3>
                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-bio-green-400 rounded-full"></div>
                        <span className="text-white font-medium">Week 1 Data</span>
                      </div>
                      <div className="text-white/70 text-sm space-y-1">
                        <div>• Dairy consumption: 6 times</div>
                        <div>• Bloating incidents: 5 times</div>
                        <div>• Energy levels: Low (avg 3/10)</div>
                        <div>• Sleep quality: Poor (avg 4/10)</div>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-probiotic-400 rounded-full"></div>
                        <span className="text-white font-medium">Week 2 Data</span>
                      </div>
                      <div className="text-white/70 text-sm space-y-1">
                        <div>• Dairy consumption: 2 times</div>
                        <div>• Bloating incidents: 1 time</div>
                        <div>• Energy levels: Improved (avg 7/10)</div>
                        <div>• Sleep quality: Better (avg 7/10)</div>
                      </div>
                    </div>

                    <motion.div 
                      className="bg-gradient-to-r from-bio-green-400/10 to-probiotic-400/10 rounded-lg p-4"
                      animate={{
                        backgroundColor: [
                          'rgba(0, 255, 136, 0.1)',
                          'rgba(139, 92, 246, 0.1)',
                          'rgba(0, 255, 136, 0.1)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={16} className="text-bio-green-400" />
                        <span className="text-white font-medium text-sm">AI Processing...</span>
                      </div>
                      <div className="text-white/70 text-xs">
                        Analyzing correlations between 47 data points...
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* AI Analysis Results */}
                <div>
                  <h3 className="font-creative-heading text-xl font-bold text-white mb-6">AI-Generated Insights</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="bg-black/20 rounded-lg p-4 border-l-4 border-bio-green-400"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-bio-green-400 rounded-full flex items-center justify-center text-black text-xs font-bold">
                          83%
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">Strong Correlation Detected</h4>
                          <p className="text-white/70 text-sm">Dairy intake correlates with bloating episodes (83% confidence)</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-black/20 rounded-lg p-4 border-l-4 border-probiotic-400"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-probiotic-400 rounded-full flex items-center justify-center">
                          <Zap size={12} className="text-black" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">Recommendation</h4>
                          <p className="text-white/70 text-sm">Try lactose-free alternatives for 14 days. Expected 70% reduction in symptoms.</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-black/20 rounded-lg p-4 border-l-4 border-enzyme-400"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-enzyme-400 rounded-full flex items-center justify-center">
                          <TrendingUp size={12} className="text-black" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">Predicted Outcome</h4>
                          <p className="text-white/70 text-sm">Energy levels may improve by 40-60% within 2 weeks based on similar user profiles.</p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="text-center pt-4">
                      <OrganicButton
                        variant="outline"
                        size="sm"
                        shape="organic"
                        onClick={() => window.location.href = '/logger'}
                        className="bg-bio-green-400 border-bio-green-400/50 text-black hover:bg-bio-green-500 px-6 py-3 rounded-xl"
                      >
                        <span className="whitespace-nowrap">Try It Yourself →</span>
                      </OrganicButton>
                    </div>
                  </div>
                </div>
              </div>
            </OrganicContainer>
          </motion.section>

          {/* Separator */}
          <div className="flex justify-center my-16">
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-probiotic-400 to-transparent"></div>
          </div>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <OrganicContainer className="p-12">
              <h2 className="font-creative-heading text-3xl font-bold text-white mb-6">
                Ready to Transform Your Gut Health?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already discovered the power of AI-driven digestive health optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <OrganicButton
                  variant="primary"
                  size="lg"
                  shape="organic"
                  glow
                  onClick={() => window.location.href = '/login'}
                  className="bg-bio-green-400 hover:bg-bio-green-500 text-black font-bold px-8 py-4 rounded-xl transition-colors"
                >
                  <span className="whitespace-nowrap">Start Your Journey</span>
                </OrganicButton>
                <OrganicButton
                  variant="outline"
                  size="lg"
                  shape="organic"
                  onClick={() => window.location.href = '/logger'}
                  className="border-2 border-bio-green-400 bg-bio-green-400 backdrop-blur-md hover:bg-bio-green-500 text-black px-8 py-4 rounded-xl transition-colors"
                >
                  <span className="whitespace-nowrap">Try Logger</span>
                </OrganicButton>
              </div>
            </OrganicContainer>
          </motion.section>
        </main>
      </div>
    </Suspense>
  )
}
