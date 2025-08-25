'use client'

import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { Brain, BarChart3, Target, Heart, Star, Zap, Bot, Globe, Smartphone, MessageCircle, Mail } from 'lucide-react'

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles, MicrobiomeParticles } from '@/components/ui/CellularParticles'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { OrganicContainer } from '@/components/ui/OrganicContainer'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background particles */}
        <CellularParticles count={15} />
        
        {/* Custom cursor - removed green cursor */}
        
        {/* Floating navigation */}
        <FloatingNavigation />
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
        >
          {/* Floating organic shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-3xl filter blur-xl"
            />
            
            <motion.div
              animate={{ 
                x: [0, -150, 0],
                y: [0, 100, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-3/4 right-1/4 w-48 h-48 bg-yellow-400/20 rounded-3xl filter blur-xl"
            />
            
            <motion.div
              animate={{ 
                x: [0, 80, 0],
                y: [0, -80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-green-400/20 rounded-2xl filter blur-lg"
            />
          </div>

          {/* Main content */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-4xl"
          >
            <motion.h1 
              className="font-creative-heading text-5xl sm:text-6xl md:text-8xl font-bold mb-8 text-white"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.5)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(0, 255, 136, 0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              GutWise
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-creative-body text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto px-4"
            >
              Unlock the secrets of your digestive health with AI-powered pattern detection. 
              Track, analyze, and optimize your gut microbiome like never before.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <OrganicButton
                variant="primary"
                size="lg"
                shape="organic"
                glow
                onClick={() => {
                  console.log('Start Your Journey clicked')
                  window.location.href = '/login'
                }}
                className="bg-transparent border-2 border-bio-green-400 text-white font-bold shadow-xl hover:shadow-2xl hover:bg-bio-green-400/10 transition-all duration-500 px-8 py-4 rounded-xl"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Start Your Journey
                </span>
              </OrganicButton>
              
              <OrganicButton
                variant="outline"
                size="lg"
                shape="organic"
                onClick={() => {
                  console.log('Learn More clicked')
                  window.location.href = '/how-it-works'
                }}
                className="border-2 border-white/30 bg-transparent backdrop-blur-md hover:bg-white/10 hover:border-bio-green-400/50 text-white font-semibold shadow-lg transition-all duration-500 px-8 py-4 rounded-xl"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Learn More
                </span>
              </OrganicButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-bio-green-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features showcase section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="font-creative-heading text-4xl md:text-6xl font-bold mb-8 text-center text-white"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Revolutionary AI Health Platform
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-xl text-center mb-16 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover patterns in your digestive health that you never knew existed. Our AI analyzes thousands of data points to give you personalized insights.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto justify-center">
              {[
                {
                  icon: Brain,
                  title: "AI Pattern Detection",
                  description: "Advanced machine learning identifies hidden correlations in your health data",
                  color: "bio-green"
                },
                {
                  icon: BarChart3,
                  title: "3D Visualization",
                  description: "Immersive microbiome visualizations make complex data easy to understand",
                  color: "probiotic"
                },
                {
                  icon: Target,
                  title: "Personalized Insights",
                  description: "Get tailored recommendations based on your unique digestive profile",
                  color: "enzyme"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center flex flex-col items-center justify-center"
                >
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${feature.color}-400/20 flex items-center justify-center text-4xl border border-${feature.color}-400/30`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <feature.icon size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <OrganicButton
                variant="outline"
                size="lg"
                shape="organic"
                onClick={() => {
                  document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="border-2 border-white/30 bg-transparent backdrop-blur-md hover:bg-white/10 hover:border-bio-green-400/50 text-white font-semibold"
              >
                <span className="flex items-center gap-2">
                  See What Users Say
                </span>
              </OrganicButton>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="font-creative-heading text-4xl md:text-5xl font-bold mb-16 text-center text-white"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Trusted by Health Enthusiasts Worldwide
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  role: "Nutritionist",
                  text: "GutWise helped me identify my lactose intolerance patterns. My energy levels improved by 60% in just 2 weeks!",
                  rating: 5,
                  improvement: "60% more energy"
                },
                {
                  name: "Mike R.",
                  role: "Software Engineer",
                  text: "The AI patterns detected correlations I never noticed. My digestive issues are almost completely gone.",
                  rating: 5,
                  improvement: "90% fewer symptoms"
                },
                {
                  name: "Dr. Lisa Chen",
                  role: "Gastroenterologist",
                  text: "I recommend GutWise to my patients. The insights help them make informed dietary choices.",
                  rating: 5,
                  improvement: "Professional recommended"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-bio-green-400 w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                    <div className="text-bio-green-400 text-sm font-semibold">
                      {testimonial.improvement}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-center">
                {[
                  { number: "85%", label: "Success Rate" },
                  { number: "500+", label: "Food Patterns" },
                  { number: "24/7", label: "AI Monitoring" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-bio-green-400 mb-2">{stat.number}</div>
                    <div className="text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              className="font-creative-heading text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-white px-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.5)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(0, 255, 136, 0.5)'
                ]
              }}
            >
              Ready to Transform Your Health?
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-xl mb-12 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of users who have discovered the power of AI-driven gut health optimization. Your personalized journey starts with a single click.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
            >
              <OrganicButton
                variant="primary"
                size="lg"
                shape="organic"
                glow
                onClick={() => {
                  window.location.href = '/login'
                }}
                className="bg-transparent border-2 border-bio-green-400 text-white font-bold shadow-xl hover:shadow-2xl hover:bg-bio-green-400/10 transition-all duration-500 px-8 py-4 rounded-xl"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Start Your Journey
                </span>
              </OrganicButton>
              
              <OrganicButton
                variant="outline"
                size="lg"
                shape="organic"
                onClick={() => {
                  window.location.href = '/how-it-works'
                }}
                className="border-2 border-white/30 bg-transparent backdrop-blur-md hover:bg-white/10 hover:border-bio-green-400/50 text-white font-semibold shadow-lg transition-all duration-500 px-8 py-4 rounded-xl"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Learn More
                </span>
              </OrganicButton>
            </motion.div>

            {/* Final stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: "95%", label: "User Satisfaction", icon: Star },
                { number: "2 weeks", label: "Average Results", icon: Zap },
                { number: "24/7", label: "AI Support", icon: Bot }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="mb-2 flex justify-center">
                    <stat.icon size={32} className="text-bio-green-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-bio-green-400 mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <motion.h3 
                  className="font-clash text-3xl font-bold text-white mb-4"
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(0, 255, 136, 0.3)',
                      '0 0 20px rgba(139, 92, 246, 0.3)',
                      '0 0 10px rgba(0, 255, 136, 0.3)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  GutWise
                </motion.h3>
                <p className="text-white/70 mb-6 max-w-md">
                  Revolutionizing digestive health through AI-powered pattern detection and personalized insights.
                </p>
                <div className="flex gap-4">
                  {[Globe, Smartphone, MessageCircle, Mail].map((Icon, index) => (
                    <motion.div
                      key={index}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer"
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: 'rgba(0, 255, 136, 0.2)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <div className="space-y-2">
                  {['Features', 'How it Works', 'Pricing', 'API'].map((item) => (
                    <a 
                      key={item}
                      href="#" 
                      className="block text-white/70 hover:text-bio-green-400 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <div className="space-y-2">
                  {['Help Center', 'Community', 'Contact', 'Privacy'].map((item) => (
                    <a 
                      key={item}
                      href="#" 
                      className="block text-white/70 hover:text-bio-green-400 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
              <p>&copy; 2024 GutWise. All rights reserved. Built with AI, designed for health.</p>
            </div>
          </motion.div>
        </footer>
      </div>
    </Suspense>
  )
}