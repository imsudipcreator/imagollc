import type { Metadata } from 'next'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './_components/app-sidebar'
import Navbar from './_components/navbar'
import InputBar from './_components/input-bar'

export const metadata: Metadata = {
  title: "Intelligence - AI for the rest of us",
  description: ""
}

const IntelligenceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full h-svh '>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex flex-col w-full h-full '>
          <Navbar />
          {children}
          <InputBar/>
        </main>
      </SidebarProvider>
    </div>

  )
}

export default IntelligenceLayout