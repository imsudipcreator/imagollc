'use client'

import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MarkdownRender from '../../components/markdown-render'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Loader, TriangleAlert } from 'lucide-react'
import { useIntelligence } from '@/contexts/intelligence-context'



const ChatPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { isGeneratingResponse, isMessageLoading, isMessageError, messages } = useIntelligence()
    const { data: chatId, isLoading: chatIdVerifying } = api.chat.getOne.useQuery({
        chatId: id as string
    }, {
        enabled: !!id
    })
    const { data: task } = api.task.getOne.useQuery({
        chatId: id as string
    }, {
        enabled: !!id,
    })


    useEffect(() => {
        console.log(chatId)
        if (!chatId && !chatIdVerifying) {
            router.replace('/intelligence')
        }
    }, [chatId, router, chatIdVerifying])




    if (isMessageLoading || chatIdVerifying) {
        <div className='flex justify-center items-center w-full h-[77%] '>
            <Loader className='animate-spin' />
        </div>
    }


    if (isMessageError) {
        <div className='flex justify-center items-center w-full h-[77%] text-destructive'>
            <TriangleAlert className='size-10' />
            <span>Something went wrong!</span>
        </div>
    }


    return (
        <div className='flex justify-center overflow-y-auto no-scrollbar w-full h-[77%] '>
            <div className='max-w-3xl md:w-full w-[94%] flex flex-col h-fit pb-32 gap-y-8'>
                {
                    messages?.map((message) => (
                        <ContextMenu key={message.id}>
                            <ContextMenuTrigger asChild>
                                <div
                                    className={cn('rounded-2xl px-3 py-2 select-none shrink-0',
                                        message.role === 'user' ? "max-w-[80%] ml-auto bg-muted" : "max-w-[90%] mr-auto bg-transparent"
                                    )}>
                                    <MarkdownRender>
                                        {message.content}
                                    </MarkdownRender>

                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className='w-52'>
                                <ContextMenuItem>
                                    Copy
                                    <ContextMenuShortcut>⌘ Shift C</ContextMenuShortcut>
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    ))
                }
                {
                    isGeneratingResponse.state && (
                        <span className='text-muted-foreground font-semibold text-lg animate-pulse py-2 px-3'>{isGeneratingResponse.log}</span>
                    )
                }
            </div>
        </div >
    )
}

export default ChatPage