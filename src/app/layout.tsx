import type { Metadata } from 'next'
import { SessionProvider } from '@/components/providers/SessionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'GutWise - AI-Powered Gut Health Tracking',
  description: 'Track your gut health, identify food sensitivities, and optimize your digestive wellness with AI-powered insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <SessionProvider>
          <div className="cellular-bg min-h-screen">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}