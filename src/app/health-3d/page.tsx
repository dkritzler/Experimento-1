'use client'

import dynamic from 'next/dynamic'

const GutHealth3D = dynamic(() => {
  return import('@/components/visualizations/GutHealth3D').then(mod => ({ 
    default: mod.GutHealth3D 
  }))
}, {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-lg font-creative-body">Loading 3D visualization...</div>
    </div>
  )
})

import { FloatingNavigation } from '@/components/ui/FloatingNavigation'
import { Suspense } from 'react'

export default function Health3DPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Custom cursor */}
      {/* Custom cursor - removed green cursor */}
      
      {/* Floating navigation */}
      <FloatingNavigation />
      
      {/* Main content */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-lg">Loading 3D visualization...</div>
        </div>
      }>
        <GutHealth3D />
      </Suspense>
    </div>
  )
}