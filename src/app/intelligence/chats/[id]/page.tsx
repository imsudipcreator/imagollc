'use client'

import { api } from '@/trpc/react'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatPage =() => {
    const { id } = useParams()
    const { user } = useUser()
    const router = useRouter()
    const { data } = api.chat.getOne.useQuery({
        chatId : id as string,
        userId : user?.id ?? "",
    },
    { enabled : !!user?.id && !!id}
    )

    useEffect(() => {
        console.log(data)
        if(!data){
            router.replace('/intelligence')
        }
    },[data, router])

    return (
        <div className='flex-1 bg-emerald-300 flex items-center justify-center'>
            <div className='max-w-3xl w-full h-full overflow-y-auto bg-amber-500 mx-1.5'>
                <div>ChatPage, {id}</div>
            </div>
        </div>
    )
}

export default ChatPage