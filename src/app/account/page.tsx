'use client'

import { motion } from 'framer-motion'
import { User, Settings, Bell, Shield, CreditCard, LogOut, Edit3, Camera } from 'lucide-react'
import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'
import { CellularParticles } from '@/components/ui/CellularParticles'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background particles */}
        <CellularParticles count={10} />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-bio-green-400/20 to-blue-400/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-1/5 w-48 h-48 bg-gradient-to-l from-yellow-400/15 to-purple-400/15 rounded-full filter blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-gradient-to-br from-green-400/10 to-cyan-400/10 rounded-full filter blur-xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-creative-heading font-bold text-white mb-4">
            Account Settings
          </h1>
          <p className="text-white/70 font-creative-body text-lg max-w-2xl mx-auto">
            Manage your profile, preferences, and account security
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-bio-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-bio-green-400 rounded-lg flex items-center justify-center hover:bg-bio-green-500 transition-colors">
                    <Camera size={16} className="text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-creative-heading font-bold text-white mb-2">
                    Sarah Johnson
                  </h2>
                  <p className="text-white/60 font-creative-body mb-2">sarah.johnson@email.com</p>
                  <p className="text-bio-green-400 text-sm font-creative-body">Premium Member since Jan 2024</p>
                </div>
                <OrganicButton variant="outline" size="sm">
                  <Edit3 size={16} />
                  Edit Profile
                </OrganicButton>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bio-green-400">47</div>
                  <div className="text-white/60 text-sm">Days Tracking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">8.2</div>
                  <div className="text-white/60 text-sm">Avg Health Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">23</div>
                  <div className="text-white/60 text-sm">Insights Generated</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="text-blue-400" size={24} />
                  <h3 className="text-xl font-creative-heading font-bold text-white">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-creative-body">Meal reminders</span>
                    <button className="w-12 h-6 bg-bio-green-400 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-creative-body">Health insights</span>
                    <button className="w-12 h-6 bg-bio-green-400 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-creative-body">Weekly reports</span>
                    <button className="w-12 h-6 bg-white/20 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-yellow-400" size={24} />
                  <h3 className="text-xl font-creative-heading font-bold text-white">Privacy & Security</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Change Password →
                  </button>
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Two-Factor Authentication →
                  </button>
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Data Export →
                  </button>
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Privacy Settings →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-bio-green-400" size={24} />
                  <h3 className="text-xl font-creative-heading font-bold text-white">Subscription</h3>
                </div>
                <div className="mb-4">
                  <div className="text-bio-green-400 font-bold font-creative-heading">Premium Plan</div>
                  <div className="text-white/60 text-sm font-creative-body">Next billing: Feb 15, 2024</div>
                  <div className="text-white/60 text-sm font-creative-body">$19.99/month</div>
                </div>
                <OrganicButton variant="outline" size="sm" className="w-full">
                  Manage Subscription
                </OrganicButton>
              </div>
            </motion.div>

            {/* App Settings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="text-blue-400" size={24} />
                  <h3 className="text-xl font-creative-heading font-bold text-white">App Settings</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Units & Measurements →
                  </button>
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Data Sync Settings →
                  </button>
                  <button className="w-full text-left text-white/80 hover:text-white transition-colors font-creative-body">
                    Connected Devices →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Logout Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <OrganicButton 
              variant="outline" 
              className="border-red-400/50 text-red-400 hover:bg-red-400/10"
              onClick={() => {
                console.log('Logout clicked')
                window.location.href = '/login'
              }}
            >
              <LogOut size={16} />
              Sign Out
            </OrganicButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}