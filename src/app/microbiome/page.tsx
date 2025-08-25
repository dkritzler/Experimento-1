'use client'

import { MicrobiomeDashboard } from '@/components/dashboard/MicrobiomeDashboard'

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { CellularParticles } from '@/components/ui/CellularParticles'

export default function MicrobiomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background particles */}
      <CellularParticles count={10} className="opacity-20" />
      
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      {/* Main content */}
      <MicrobiomeDashboard />
    </div>
  )
}