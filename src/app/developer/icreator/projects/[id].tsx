'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { api } from '@/trpc/react'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { TabsContent } from '@/components/ui/tabs'
import { Loader } from 'lucide-react'
import { useCreator } from '../contexts/creator-context'
import ChatPage from '../components/chat'
import PreviewPage from '../components/preview-page'
import { useParams } from 'next/navigation'

const ICreatorPage = () => {
    const { id } = useParams()
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
        <div className='w-full h-svh flex'>
            <TabsContent value='chat' className='flex-1 flex'>
                {
                    isMobile ? (
                        <ChatPage />
                    ) : (
                        <ResizablePanelGroup direction='horizontal' className='flex-1'>
                            <ResizablePanel className={cn('flex-1  flex')} defaultSize={50} minSize={30} maxSize={70}>
                                <ChatPage />
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={50} minSize={30} className='flex-1  flex'>
                                <PreviewPage />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    )
                }

            </TabsContent>
            <TabsContent value='preview' className='flex-1 flex'>
                <div className='flex-1 flex'>
                    <PreviewPage />
                </div>
            </TabsContent>
        </div>
    )
}

export default ICreatorPage