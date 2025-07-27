'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { api } from '@/trpc/react'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Loader } from 'lucide-react'
import { useCreator } from '../../contexts/creator-context'
import ChatPage from '../../components/chat'
import PreviewPage from '../../components/preview-page'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'

const ICreatorPage = () => {
    const { id } = useParams()
    const { setCode, setIsPending, isPending } = useCreator()
    const router = useRouter()
    const isMobile = useIsMobile()
    const [counter, setCounter] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const { isPending: isTaskFetchPending, data: tasks, refetch: refetchTasks } = api.task.getWebsiteTasks.useQuery()
    const { data, isLoading, refetch: refetchWebsite } = api.website.findOne.useQuery({
        id: id as string
    })


    useEffect(() => {
        if (tasks && tasks?.length > 0) {
            setIsPending(true)
        } else {
            console.log("stopped")
            void refetchWebsite()
            setIsPending(false)
        }
    }, [tasks, setIsPending, refetchWebsite])

    useEffect(() => {
        if (isPending && counter < 20) {
            console.log("calling")
            setCounter(prev => prev++)
            const refetchInterval = setInterval(() => { void refetchTasks() }, 1000)
            return () => clearInterval(refetchInterval)
        }

    }, [isPending, refetchTasks, counter])

    if (!isLoading && !data) {
        router.replace("/developer/icreator")
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true)
        }, 100) // simulate async if needed or wait for layout

        if (data) {
            setCode(data.code)
        }

        return () => clearTimeout(timer)
    }, [data, setCode])

    const showLoading = !isReady || isLoading

    if (showLoading) {
        return (
            <div className='flex flex-1 justify-center items-center'>
                <Loader className='animate-spin' />
            </div>
        )

    }
    return (
        <Tabs defaultValue="chat" className="flex-1 flex flex-col gap-0">
            <Navbar slug={data?.slug ?? "Unknown-Project"} projectId={id as string} />
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
        </Tabs>
    )
}

export default ICreatorPage