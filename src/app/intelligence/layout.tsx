import type { Metadata } from 'next'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './components/app-sidebar'
import Navbar from './components/navbar'
import InputBar from './components/input-bar'
import { IntelligenceProvider } from '@/contexts/intelligence-context'

export const metadata: Metadata = {
  title: "Intelligence - AI for the rest of us",
  description: ""
}

const IntelligenceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <IntelligenceProvider>
      <SidebarProvider>
        <div className='flex w-full h-svh'>
          <AppSidebar />
          <main className='flex flex-col flex-1 min-h-0 overflow-y-auto relative'>
            <Navbar />
            {children}
            <InputBar />
          </main>
        </div>
      </SidebarProvider>
    </IntelligenceProvider>

  )
}

export default IntelligenceLayout