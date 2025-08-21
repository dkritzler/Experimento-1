'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Microscope, Zap, Heart, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

import { CellularParticles, MicrobiomeParticles } from '@/components/ui/CellularParticles'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Pattern Detection',
    description: 'Advanced machine learning algorithms analyze your food intake and symptoms to discover hidden patterns and sensitivities.',
    benefits: ['Identifies food triggers', 'Predicts symptom patterns', 'Personalized insights']
  },
  {
    icon: Microscope,
    title: 'Microbiome Visualization',
    description: 'Interactive 3D visualization of your gut bacteria ecosystem with real-time health scoring and trend analysis.',
    benefits: ['Live bacteria mapping', '3D health scores', 'Trend tracking']
  },
  {
    icon: Zap,
    title: 'Real-Time Tracking',
    description: 'Revolutionary time-spiral interface for logging meals and symptoms with drag-and-drop simplicity.',
    benefits: ['Intuitive logging', 'Time-based patterns', 'Effortless tracking']
  },
  {
    icon: Heart,
    title: 'Personalized Recommendations',
    description: 'Swipe through curated recipes and supplement suggestions tailored to your unique gut health profile.',
    benefits: ['Custom meal plans', 'Targeted supplements', 'Expert guidance']
  }
]

const stats = [
  { number: '50,000+', label: 'Users Transformed' },
  { number: '94%', label: 'Improvement Rate' },
  { number: '2.5M+', label: 'Meals Analyzed' },
  { number: '15,000+', label: 'Patterns Discovered' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Executive',
    text: 'GutWise helped me identify my dairy sensitivity within 2 weeks. The AI insights were spot-on!',
    avatar: '👩‍💼'
  },
  {
    name: 'Dr. Michael Torres',
    role: 'Gastroenterologist',
    text: 'The pattern visualization is revolutionary. I now recommend GutWise to all my patients.',
    avatar: '👨‍⚕️'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Yoga Instructor',
    text: 'The microbiome dashboard is fascinating. Watching my gut health improve in real-time is amazing.',
    avatar: '🧘‍♀️'
  }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <motion.h1
            className="text-2xl font-clash font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            GutWise
          </motion.h1>
          
          <div className="flex gap-4">
            <OrganicButton
              variant="ghost"
              onClick={() => window.location.href = '/'}
            >
              Home
            </OrganicButton>
            <OrganicButton
              variant="primary"
              shape="organic"
              onClick={() => window.location.href = '/login'}
            >
              Get Started
            </OrganicButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <CellularParticles count={20} className="opacity-10" />
        
        <motion.div
          className="text-center max-w-4xl mx-auto px-6"
          style={{ opacity }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-clash font-bold text-white mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(0, 255, 136, 0.5)',
                '0 0 40px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(0, 255, 136, 0.5)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Revolutionizing Gut Health
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The world's first AI-powered gut health platform that learns your unique digestive patterns 
            and provides personalized insights to optimize your wellbeing.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <OrganicButton
              variant="primary"
              size="lg"
              shape="liquid"
              glow
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-bio-green-400 via-probiotic-400 to-enzyme-400 text-black font-bold"
            >
              <span className="flex items-center gap-2">
                🚀 Start Free Trial
                <ArrowRight size={20} />
              </span>
            </OrganicButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <MicrobiomeParticles count={15} className="opacity-5" />
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-clash font-bold text-white mb-4">
              Why GutWise is Different
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We don't just track your symptoms—we understand them through advanced AI and beautiful visualizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <OrganicContainer variant="organic" glow size="lg" className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-bio-green-400/20 flex items-center justify-center">
                        <feature.icon className="text-bio-green-400" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="text-bio-green-400" size={16} />
                          <span className="text-white/70 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </OrganicContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <OrganicContainer variant="blob" glow size="md">
                  <div className="text-3xl md:text-4xl font-bold text-bio-green-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stat.label}
                  </div>
                </OrganicContainer>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-clash font-bold text-white mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-white/70">
              Real people, real results, real transformations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <OrganicContainer variant="cell" size="md" className="h-full">
                  <div className="space-y-4 text-center">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <p className="text-white/80 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </OrganicContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <CellularParticles count={10} className="opacity-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <OrganicContainer variant="organic" glow pulse size="xl">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-clash font-bold text-white">
                  Ready to Transform Your Gut Health?
                </h2>
                
                <p className="text-xl text-white/80 leading-relaxed">
                  Join thousands of people who have discovered their optimal health through 
                  personalized gut health insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <OrganicButton
                    variant="primary"
                    size="lg"
                    shape="liquid"
                    glow
                    onClick={() => window.location.href = '/login'}
                    className="bg-gradient-to-r from-bio-green-400 via-probiotic-400 to-enzyme-400 text-black font-bold"
                  >
                    <span className="flex items-center gap-2">
                      🌟 Start Your Journey
                      <ArrowRight size={20} />
                    </span>
                  </OrganicButton>
                  
                  <OrganicButton
                    variant="outline"
                    size="lg"
                    shape="organic"
                    onClick={() => window.location.href = '/onboarding'}
                  >
                    <span className="flex items-center gap-2">
                      👀 See Demo
                    </span>
                  </OrganicButton>
                </div>

                <div className="text-white/60 text-sm">
                  Free 14-day trial • No credit card required • Cancel anytime
                </div>
              </div>
            </OrganicContainer>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-clash font-bold text-white mb-4">GutWise</h3>
              <p className="text-white/60 text-sm">
                Revolutionizing gut health through AI-powered personalized insights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-2 text-sm text-white/60">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2 text-sm text-white/60">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2 text-sm text-white/60">
                <div>Help Center</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
            © 2024 GutWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}