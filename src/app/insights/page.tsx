'use client'

import { AIPatternVisualizer } from '@/components/insights/AIPatternVisualizer'

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      {/* Main content */}
      <AIPatternVisualizer />
    </div>
  )
}