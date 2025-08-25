'use client'

import { motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { 
  ArrowLeft, Brain, Activity, User, Target, Sparkles, 
  Check, ArrowRight, Microscope, ChartBar, Lightbulb,
  Shield, Clock, Users, Star
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Track Your Journey',
    description: 'Log meals, symptoms, and daily activities with our intuitive interface',
    icon: Activity,
    color: 'from-bio-green-400 to-probiotic-400'
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Advanced algorithms identify patterns in your health data',
    icon: Brain,
    color: 'from-probiotic-400 to-enzyme-400'
  },
  {
    number: '03',
    title: 'Personalized Insights',
    description: 'Receive tailored recommendations based on your unique profile',
    icon: Lightbulb,
    color: 'from-enzyme-400 to-bio-green-400'
  },
  {
    number: '04',
    title: 'Optimize & Thrive',
    description: 'Track progress and continuously improve your gut health',
    icon: Target,
    color: 'from-bio-green-400 to-probiotic-400'
  }
]

const features = [
  {
    title: 'Real-time Analysis',
    description: 'Get instant feedback on your dietary choices',
    icon: Clock
  },
  {
    title: 'Privacy First',
    description: 'Your health data is encrypted and secure',
    icon: Shield
  },
  {
    title: 'Community Support',
    description: 'Connect with others on similar journeys',
    icon: Users
  },
  {
    title: 'Expert Backed',
    description: 'Developed with leading health professionals',
    icon: Star
  }
]

const benefits = [
  'Identify food sensitivities and triggers',
  'Improve digestive comfort and regularity',
  'Boost energy levels naturally',
  'Enhance nutrient absorption',
  'Reduce inflammation and bloating',
  'Optimize your gut microbiome'
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background particles */}
        <CellularParticles count={8} className="opacity-20" />
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 left-1/4 w-64 h-64 bg-bio-green-400/5 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -50, 50, 0],
              y: [0, 30, -30, 0],
              rotate: [360, 270, 180, 90, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-probiotic-400/5 rounded-full filter blur-3xl"
          />
        </div>
        
        {/* Floating navigation */}
        <FloatingNavigation />
        
        {/* Back button */}
        <motion.button
          onClick={() => window.location.href = '/'}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="fixed top-8 left-8 z-30 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-creative-heading font-bold text-white mb-6">
              How GutWise Works
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Transform your digestive health with AI-powered insights and personalized recommendations
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { value: '95%', label: 'Accuracy Rate' },
                { value: '2 weeks', label: 'Average Results' },
                { value: '24/7', label: 'AI Monitoring' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Process Steps */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-creative-heading font-bold text-white text-center mb-12">
              Your Journey in 4 Simple Steps
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Steps Cards */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    className="cursor-pointer"
                  >
                    <OrganicContainer 
                      className={`p-6 transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-white/10 border-white/30' 
                          : 'bg-white/5 border-white/10 hover:bg-white/8'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                          <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                            <step.icon size={24} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white/40 text-sm font-mono">{step.number}</span>
                            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                          </div>
                          <p className="text-white/60">{step.description}</p>
                        </div>
                        <ArrowRight 
                          size={20} 
                          className={`text-white/30 transition-all ${
                            activeStep === index ? 'translate-x-2 text-white/60' : ''
                          }`} 
                        />
                      </div>
                    </OrganicContainer>
                  </motion.div>
                ))}
              </div>

              {/* Visual Display */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                <OrganicContainer className="p-8 h-full bg-white/5">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <motion.div
                      key={activeStep}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className={`w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${steps[activeStep].color} p-1`}>
                        <div className="w-full h-full bg-black rounded-3xl flex items-center justify-center">
                          {React.createElement(steps[activeStep].icon, { size: 48, className: "text-white" })}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{steps[activeStep].title}</h3>
                      <p className="text-white/70 max-w-sm mx-auto">{steps[activeStep].description}</p>
                    </motion.div>
                  </div>
                </OrganicContainer>
              </motion.div>
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-creative-heading font-bold text-white text-center mb-12">
              Transform Your Health
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
                >
                  <Check size={20} className="text-bio-green-400 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <OrganicContainer className="p-6 h-full text-center">
                    <feature.icon size={32} className="text-white/60 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </OrganicContainer>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <OrganicContainer className="p-12 bg-gradient-to-br from-white/5 to-white/10">
              <h2 className="text-3xl font-creative-heading font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed their gut health with GutWise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <OrganicButton
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/login'}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Get Started Free
                </OrganicButton>
                <OrganicButton
                  variant="ghost"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="text-white/70 hover:text-white"
                >
                  Learn More
                </OrganicButton>
              </div>
            </OrganicContainer>
          </motion.section>
        </main>
      </div>
    </Suspense>
  )
}

import React from 'react'