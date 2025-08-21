'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'

import { CellularParticles } from '@/components/ui/CellularParticles'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    console.log('Form submitted:', formData)
    // Redirect to dashboard after successful login/signup
    window.location.href = '/onboarding'
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background particles */}
      <CellularParticles count={15} className="opacity-20" />
      
      {/* Custom cursor - removed green cursor */}

      {/* Back to home button */}
      <motion.button
        className="absolute top-8 left-8 z-30 text-white/70 hover:text-white transition-colors"
        onClick={() => window.location.href = '/'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          ← Back to Home
        </span>
      </motion.button>

      {/* Logo */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-creative-heading font-bold text-white">
          GutWise
        </h1>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="w-full max-w-md mx-auto px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center flex flex-col items-center justify-center">
              <motion.h2
                className="text-3xl font-creative-heading font-bold text-white mb-3 text-center"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(0, 255, 136, 0.3)',
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                    '0 0 10px rgba(0, 255, 136, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {isLogin ? 'Welcome Back' : 'Join GutWise'}
              </motion.h2>
              <p className="text-white/70 text-center max-w-xs mx-auto">
                {isLogin 
                  ? 'Continue your gut health journey' 
                  : 'Start your personalized gut health journey'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for signup */}
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-organic w-full pl-12"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-organic w-full pl-12"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="input-organic w-full pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm password for signup */}
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="input-organic w-full pl-12"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit button */}
              <OrganicButton
                type="submit"
                variant="primary"
                size="lg"
                shape="organic"
                glow
                className="w-full bg-transparent border-2 border-bio-green-400 text-white font-bold hover:bg-bio-green-400/10 px-8 py-4 rounded-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </span>
              </OrganicButton>
            </form>

            {/* Toggle between login/signup */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/70 hover:text-bio-green-400 transition-colors underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Social login options */}
            <div className="space-y-3">
              <div className="text-center text-white/50 text-sm">
                or continue with
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <OrganicButton
                  variant="outline"
                  shape="organic"
                  className="flex items-center justify-center gap-2 bg-transparent border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl"
                >
                  <span>🔍</span>
                  <span className="whitespace-nowrap">Google</span>
                </OrganicButton>
                
                <OrganicButton
                  variant="outline"
                  shape="organic"
                  className="flex items-center justify-center gap-2 bg-transparent border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl"
                >
                  <span>🍎</span>
                  <span className="whitespace-nowrap">Apple</span>
                </OrganicButton>
              </div>
            </div>

            {/* Terms and privacy */}
            <div className="text-center text-xs text-white/50">
              By continuing, you agree to our{' '}
              <a href="#" className="text-bio-green-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-bio-green-400 hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-3xl filter blur-xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-400/10 rounded-2xl filter blur-lg pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}