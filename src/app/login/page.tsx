'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Sign in with credentials
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError('Invalid email or password')
        } else {
          // Check if user has completed onboarding
          const session = await getSession()
          if (session) {
            router.push('/onboarding')
          }
        }
      } else {
        // Register new user
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Registration failed')
        } else {
          // Auto-login after registration
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/onboarding'
          })
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background particles */}
      <CellularParticles count={15} />
      
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


      {/* Floating organic shapes - animated background */}
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
        className="w-full max-w-md mx-auto px-4 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* GutWise Logo above the box */}
        <motion.h1 
          className="font-creative-heading text-5xl md:text-6xl font-bold mb-6 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: [
              '0 0 20px rgba(0, 255, 136, 0.5)',
              '0 0 40px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(0, 255, 136, 0.5)'
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: 0.2
          }}
        >
          GutWise
        </motion.h1>

        {/* Animated glow background */}
        <motion.div
          className="absolute inset-0 -inset-x-4 -inset-y-4 bg-gradient-to-r from-bio-green-400/20 via-purple-500/20 to-blue-500/20 rounded-3xl filter blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 relative z-10">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center justify-center">
              <motion.h2
                className="text-3xl font-creative-heading font-bold text-white mb-3 text-center w-full"
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
              <p className="text-white/70 text-center w-full">
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
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
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
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
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
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white placeholder-white/40 border border-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit button */}
              <OrganicButton
                type="submit"
                variant="outline"
                size="lg"
                shape="organic"
                disabled={loading}
                className="w-full bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 hover:border-white/40 px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                  {!loading && <ArrowRight size={18} />}
                </span>
              </OrganicButton>
            </form>

            {/* Toggle between login/signup */}
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

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
                  onClick={() => signIn('google')}
                  className="flex items-center justify-center gap-2 bg-transparent border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl"
                >
                  <span>🔍</span>
                  <span className="whitespace-nowrap">Google</span>
                </OrganicButton>
                
                <OrganicButton
                  variant="outline"
                  shape="organic"
                  disabled
                  className="flex items-center justify-center gap-2 bg-transparent border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl opacity-50"
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

    </div>
  )
}