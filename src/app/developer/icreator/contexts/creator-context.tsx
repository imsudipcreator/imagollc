import React, { createContext } from "react";

interface CreatorContextType {
    hi: string
}

const CreatorContext = createContext<CreatorContextType | null>(null)


export const CreatorProvider = ({ children }: { children: React.ReactNode }) => {
    const hi = ""
    return (
        <CreatorContext.Provider value={{ hi }}>
            {children}
        </CreatorContext.Provider>
    )
}