'use client'

import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import MarkdownRender from '../../_components/markdown-render'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from '@/components/ui/context-menu'

const ChatPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { data: chatId, isLoading: chatIdVerifying } = api.chat.getOne.useQuery({
        chatId: id as string
    })

    const { data: messages, isLoading: isMessageLoading, isError: isMessageError } = api.message.getMany.useQuery({
        chatId: id as string
    })


    useEffect(() => {
        console.log(chatId)
        if (!chatId && !chatIdVerifying) {
            router.replace('/intelligence')
        }
    }, [chatId, router, chatIdVerifying])





    return (
        <div className='flex-1  flex items-center justify-center'>
            <div className='max-w-3xl w-full h-full overflow-y-auto  mx-1.5 flex flex-col'>
                {
                    messages?.map((message) => (
                        <ContextMenu key={message.id}>
                            <ContextMenuTrigger asChild>
                                <div
                                    className={cn('rounded-2xl px-3 py-2 cursor-pointer select-none',
                                        message.role === 'user' ? "max-w-[80%] ml-auto bg-muted" : "max-w-[80%] mr-auto bg-transparent"
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
            </div>
        </div >
    )
}

export default ChatPage