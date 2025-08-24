/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { models, personas } from "@/constants/models";
import { api } from "@/trpc/react";
import type { Model, SettingsData } from "@/types/intel-types";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";


export type MessageType = {
    id: string
    model: string
    createdAt: Date
    updatedAt: Date
    role: "assistant" | "user"
    content: string
    userId: string
    chatId: string
    type: "error" | "result"
}

export type ChatType = {
    id: string
    slug: string | null
}



interface IntelligenceContextType {
    isGeneratingResponse: { state: boolean, log: string }
    setIsGeneratingResponse: React.Dispatch<React.SetStateAction<{ state: boolean, log: string }>>
    isMessageLoading: boolean
    isMessageError: boolean
    isChatsLoading: boolean
    isChatsError: boolean
    messages: MessageType[]
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
    chats: ChatType[]
    setChats: React.Dispatch<React.SetStateAction<ChatType[]>>
    selectedModel: string
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>
    selectedPersona: string
    setSelectedPersona: React.Dispatch<React.SetStateAction<string>>
    customPrompt: string
    setCustomPrompt: React.Dispatch<React.SetStateAction<string>>
    saveSettingsToLocal: () => void
    resetToDefault: () => void
    refetchChats: any
}

const IntelligenceContext = createContext<IntelligenceContextType | null>(null)


export const IntelligenceProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [chats, setChats] = useState<ChatType[]>([])
    const [selectedModel, setSelectedModel] = useState<string>(models[0]?.value ?? "imi1");
    const [selectedPersona, setSelectedPersona] = useState<string>(personas[0]?.value ?? "default");
    const [customPrompt, setCustomPrompt] = useState("")
    const [isGeneratingResponse, setIsGeneratingResponse] = useState<{ state: boolean, log: string }>({
        state: false,
        log: ""
    })

    const { data: chatsData, isLoading: isChatsLoading, isError: isChatsError, refetch: refetchChats } = api.chat.getMany.useQuery()
    const { data: messagesData, isLoading: isMessageLoading, isError: isMessageError } = api.message.getMany.useQuery({
        chatId: id as string
    }, {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled: !!id
    })


    const saveSettingsToLocal = () => {
        const settings: SettingsData = { model: selectedModel as Model, persona: selectedPersona, customPrompt }
        const stringifiedSettings = JSON.stringify(settings)
        window.localStorage.setItem("preferredSettings", stringifiedSettings)
        toast.success("Preferences saved")

    }

    const resetToDefault = () => {
        setSelectedModel("imi1")
        setSelectedPersona("default")
        setCustomPrompt("")
        const settings: SettingsData = { model: selectedModel as Model, persona: selectedPersona, customPrompt }
        const stringifiedSettings = JSON.stringify(settings)
        window.localStorage.setItem("preferredSettings", stringifiedSettings)
        toast.success("Preferences resetted to default")
    }


    useEffect(() => {
        const preferredSettings = window.localStorage.getItem("preferredSettings")
        if (preferredSettings) {
            try {
                const { model, persona, customPrompt } = JSON.parse(preferredSettings) as SettingsData
                setCustomPrompt(customPrompt ?? "")
                setSelectedModel(model)
                setSelectedPersona(persona)
            } catch (error) {
                console.log("Error parsing preferredSettings", error)
            }
        }
    }, [])


    useEffect(() => {
        if (chatsData) {
            setChats(chatsData)
        }
    }, [chatsData])


    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData)
        }
    }, [messagesData])

    return (
        <IntelligenceContext.Provider value={{
            isGeneratingResponse, setIsGeneratingResponse, isMessageError, isMessageLoading,
            messages, setMessages, selectedModel, setSelectedModel, selectedPersona, setSelectedPersona,
            saveSettingsToLocal, resetToDefault, customPrompt, setCustomPrompt, chats, setChats, isChatsError, isChatsLoading, refetchChats
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