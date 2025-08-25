'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppStore } from '@/store'

export function useAuth() {
  const { data: session, status } = useSession()
  const { initializeFromSession, isAuthenticated, user } = useAppStore()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      initializeFromSession(session.user)
    }
  }, [session, status, initializeFromSession])

  return {
    user,
    isAuthenticated: status === 'authenticated' && isAuthenticated,
    isLoading: status === 'loading',
    session,
  }
}