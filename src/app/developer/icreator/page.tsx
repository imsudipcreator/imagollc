'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { api } from '@/trpc/react'
import React, { useEffect, useState } from 'react'
import ChatPage from './components/chat'
import PreviewPage from './components/preview-page'
import { useCreator } from './contexts/creator-context'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { TabsContent } from '@/components/ui/tabs'
import { Loader } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const ICreatorPage = () => {
  const { } = useCreator()
  const isMobile = useIsMobile()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100) // simulate async if needed or wait for layout

    return () => clearTimeout(timer)
  }, [])

  const showLoading = !isReady

  if (showLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <Loader className='animate-spin' />
      </div>
    )

  }
  return (
    <div className='w-full min-h-0 flex flex-col px-6'>
      <div className='w-full py-8'>
        <h1 className='text-5xl font-semibold'>Sudip&apos;s Projects</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          Array(12).fill(0).map((num, i) => (
            <Card key={i} className='w-full min-h-44 rounded-none'>
              <CardHeader>
                <CardTitle>
                  Title
                </CardTitle>
                <CardDescription>
                  What is up?
                </CardDescription>
              </CardHeader>
              <CardFooter>
                Sudip
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default ICreatorPage