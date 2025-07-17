'use client'

import { createContext, useContext, useState } from "react"

interface SidebarContextType {
    slug: string
    setSlug: React.Dispatch<React.SetStateAction<string>>
    chatId: string
    setChatId: React.Dispatch<React.SetStateAction<string>>
}

export const SidebarContext = createContext<SidebarContextType | null>(null)
 
export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [slug, setSlug] = useState("")
    const [chatId, setChatId] = useState("")
    return (
        <SidebarContext.Provider value={{ slug, setSlug, chatId, setChatId }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) throw new Error("useSidebar must be used within a SidebarContextProvider")

    return context
}