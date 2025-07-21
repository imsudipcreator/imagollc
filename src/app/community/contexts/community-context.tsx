'use client'

import { api } from "@/trpc/react";
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

interface CommunityContextType {
    isPending: boolean
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>
}

const CommunityContext = createContext<CommunityContextType | null>(null)

export const CommunityProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPending, setIsPending] = useState(true)

    return (
        <CommunityContext.Provider value={{ isPending, setIsPending }}>
            {children}
        </CommunityContext.Provider>
    )
}


export const useCommunity = () => {
    const context = useContext(CommunityContext)

    if (!context) throw new Error("useCommunity must be used within a CommunityProvider")

    return context
}