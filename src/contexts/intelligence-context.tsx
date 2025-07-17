'use client'

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";


type MessageType = {
    id: string
    model: string
    createdAt: Date
    updatedAt: Date
    role: "assistant" | "user"
    content: string
    userId: string
    chatId : string
    type : "error" | "result"
}

interface IntelligenceContextType {
    isGeneratingResponse: { state: boolean, log: string }
    setIsGeneratingResponse: React.Dispatch<React.SetStateAction<{ state: boolean, log: string }>>
    isMessageLoading: boolean
    isMessageError: boolean
    messages: MessageType[]
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
}

const IntelligenceContext = createContext<IntelligenceContextType | null>(null)


export const IntelligenceProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [isGeneratingResponse, setIsGeneratingResponse] = useState<{ state: boolean, log: string }>({
        state: false,
        log: ""
    })
    // const { data: task } = api.task.getOne.useQuery({
    //     chatId: id as string
    // }, {
    //     enabled: !!id,
    // })

    const { data: messagesData, isLoading: isMessageLoading, isError: isMessageError } = api.message.getMany.useQuery({
        chatId: id as string
    }, {
        refetchInterval: 20000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled : !!id
    })

    console.log(isGeneratingResponse)


    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData)
        }
    }, [messagesData])

    return (
        <IntelligenceContext.Provider value={{
            isGeneratingResponse, setIsGeneratingResponse, isMessageError, isMessageLoading,
            messages, setMessages
        }}>
            {children}
        </IntelligenceContext.Provider>
    )
}


export const useIntelligence = () => {
    const context = useContext(IntelligenceContext)
    if (!context) throw new Error("useIntelligence must be used within a IntelligenceProvider")

    return context
}