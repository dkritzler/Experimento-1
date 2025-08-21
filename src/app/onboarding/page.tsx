'use client'

import { ImmersiveOnboarding } from '@/components/onboarding/ImmersiveOnboarding'





export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Custom cursor - removed green cursor */}
      
      {/* Main content */}
      <ImmersiveOnboarding />
    </div>
  )
}