'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Microscope, Brain, Heart, Zap, ArrowRight } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { CellularParticles, MicrobiomeParticles } from '@/components/ui/CellularParticles'

const onboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Your Gut Journey',
    subtitle: 'Discover the hidden world inside you',
    description: 'Your gut contains trillions of microorganisms that influence your health, mood, and wellbeing. Let us guide you through this fascinating ecosystem.',
    icon: '🌱',
    color: '#00FF88',
    particles: 'cellular'
  },
  {
    id: 'microbiome',
    title: 'Meet Your Microbiome',
    subtitle: 'A universe of bacteria working for you',
    description: 'Inside your digestive system lives a complex community of bacteria, fungi, and other microbes. This is your microbiome - your second brain.',
    icon: '🦠',
    color: '#8B5CF6',
    particles: 'microbiome'
  },
  {
    id: 'patterns',
    title: 'AI Discovers Patterns',
    subtitle: 'Intelligence meets intuition',
    description: 'Our advanced AI analyzes your food intake, symptoms, and biomarkers to uncover hidden patterns and sensitivities you never knew existed.',
    icon: '🧠',
    color: '#FF6B35',
    particles: 'neural'
  },
  {
    id: 'tracking',
    title: 'Track with Precision',
    subtitle: 'Every meal tells a story',
    description: 'Log your meals, symptoms, and mood through our intuitive time-spiral interface. Each data point helps us understand your unique digestive signature.',
    icon: '📊',
    color: '#FF8C42',
    particles: 'data'
  },
  {
    id: 'insights',
    title: 'Personalized Insights',
    subtitle: 'Your path to optimal health',
    description: 'Receive tailored recommendations, meal suggestions, and supplement advice based on your personal gut health profile and AI-discovered patterns.',
    icon: '✨',
    color: '#A78BFA',
    particles: 'insights'
  },
  {
    id: 'start',
    title: 'Begin Your Transformation',
    subtitle: 'Your gut health journey starts now',
    description: 'Ready to unlock the secrets of your digestive health? Let\'s create your personalized gut health profile and start discovering what makes you feel your best.',
    icon: '🚀',
    color: '#00CC66',
    particles: 'celebration'
  }
]

function OnboardingStep({ 
  step, 
  index, 
  progress 
}: { 
  step: typeof onboardingSteps[0]
  index: number
  progress: number 
}) {
  const stepProgress = Math.max(0, Math.min(1, (progress - index) / 1))
  const opacity = useTransform(useSpring(stepProgress), [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(useSpring(stepProgress), [0, 0.5, 1], [0.8, 1, 0.8])
  const y = useTransform(useSpring(stepProgress), [0, 0.5, 1], [100, 0, -100])

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative"
      style={{ opacity, scale, y }}
    >
      {/* Background particles based on step type */}
      {step.particles === 'cellular' && <CellularParticles count={20} />}
      {step.particles === 'microbiome' && <MicrobiomeParticles count={30} />}
      {step.particles === 'neural' && (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="neural" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="2" fill={step.color} opacity="0.5" />
                <line x1="100" y1="100" x2="150" y2="50" stroke={step.color} strokeWidth="1" opacity="0.3" />
                <line x1="100" y1="100" x2="50" y2="150" stroke={step.color} strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)" />
          </svg>
        </div>
      )}

      <motion.div
        className="max-w-4xl mx-auto px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Icon */}
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {step.icon}
        </motion.div>

        {/* Content */}
        <OrganicContainer 
          variant="organic" 
          glow 
          pulse 
          size="lg"
          className="backdrop-blur-md"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-clash font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${step.color}, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            {step.title}
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl font-space text-white/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {step.subtitle}
          </motion.h2>

          <motion.p
            className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {step.description}
          </motion.p>

          {/* Action for final step */}
          {step.id === 'start' && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <OrganicButton
                variant="primary"
                size="lg"
                shape="liquid"
                glow
              >
                Start Your Journey <ArrowRight size={20} className="ml-2" />
              </OrganicButton>
            </motion.div>
          )}
        </OrganicContainer>

        {/* Step indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            {onboardingSteps.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-white' : 'bg-white/30'
                }`}
                style={{
                  backgroundColor: i === index ? step.color : 'rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  scale: i === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: i === index ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ImmersiveOnboarding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [currentStep, setCurrentStep] = useState(0)
  const progress = useTransform(scrollYProgress, [0, 1], [0, onboardingSteps.length - 1])

  useEffect(() => {
    const unsubscribe = progress.onChange((value) => {
      setCurrentStep(Math.round(value))
    })
    return unsubscribe
  }, [progress])

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Scroll-driven background animation */}
      <motion.div
        className="fixed inset-0 opacity-20"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.2, 0.4, 0.6, 0.8, 1],
            [
              'radial-gradient(circle, #00FF88 0%, transparent 70%)',
              'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
              'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
              'radial-gradient(circle, #FF8C42 0%, transparent 70%)',
              'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
              'radial-gradient(circle, #00CC66 0%, transparent 70%)',
            ]
          )
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <OrganicContainer variant="cell" size="sm">
          <div className="flex items-center gap-2 text-white/70">
            <ChevronDown size={16} className="animate-bounce" />
            <span className="text-sm">Scroll to explore</span>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-bio-green-400 to-probiotic-400"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.div>

      {/* Steps */}
      <div className="relative">
        {onboardingSteps.map((step, index) => (
          <div key={step.id} className="relative">
            <OnboardingStep 
              step={step} 
              index={index} 
              progress={useTransform(scrollYProgress, [0, 1], [0, onboardingSteps.length - 1]).get()}
            />
          </div>
        ))}
      </div>

      {/* Spacer for scroll */}
      <div style={{ height: `${onboardingSteps.length * 100}vh` }} />
    </div>
  )
}