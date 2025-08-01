'use client'
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";


type NavTheme = 'light' | 'dark' | 'gray';
interface NavbarContextType {
    openedNav: string | null
    setOpenedNav: React.Dispatch<React.SetStateAction<string | null>>
    openedSubRoutes: string | null
    setOpenedSubRoutes: React.Dispatch<React.SetStateAction<string | null>>
    isNativeNavbar: boolean
    setIsNativeNavbar: React.Dispatch<React.SetStateAction<boolean>>
    navTheme: "light" | "dark" | "gray"
    setNavTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | "gray">>
    navbarThemes: Record<NavTheme, ThemeVariant>;
    nativeNav: boolean
    closeNavs: () => void
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

interface ThemeVariant {
    opaque: string;
    translucent: string;
}

const NavbarContext = createContext<NavbarContextType | null>(null)

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const [openedNav, setOpenedNav] = useState<string | null>(null)
    const [openedSubRoutes, setOpenedSubRoutes] = useState<string | null>(null)
    const [isNativeNavbar, setIsNativeNavbar] = useState<boolean>(false)
    const nativeNavbarRoutes = ['/community']
    const nativeNav = nativeNavbarRoutes.some(route => pathname.startsWith(route))
    const [navTheme, setNavTheme] = useState<NavTheme>("light")
    const [query, setQuery] = useState("")

    const navbarThemes: Record<NavTheme, ThemeVariant> = {
        light: {
            opaque: 'bg-white text-foreground/95',
            translucent: 'bg-white/60 text-foreground/95'
        },
        dark: {
            opaque: 'bg-black text-dark-foreground',
            translucent: 'bg-black/90 text-dark-foreground'
        },
        gray: {
            opaque: 'bg-background text-foreground',
            translucent: 'bg-background/60 text-foreground'
        }
    }

    function closeNavs() {
        if (openedNav !== null) setOpenedNav(null)
        if (openedSubRoutes !== null) setOpenedSubRoutes(null)
        if (query.length > 0) setQuery("")
    }


    useEffect(() => {
        if (pathname === '/community') {
            setNavTheme('dark')
        } else if (pathname === '/apps') {
            setNavTheme("gray")
        } else if (pathname === '/policy') {
            setNavTheme("gray")
        } else {
            setNavTheme('light')
        }
    }, [pathname])

    return (
        <NavbarContext.Provider value={{
            openedNav, setOpenedNav, isNativeNavbar, setIsNativeNavbar, navTheme, setNavTheme,
            navbarThemes, nativeNav, openedSubRoutes, setOpenedSubRoutes, closeNavs,
            query, setQuery
        }}>
            {children}
        </NavbarContext.Provider>
    )
}


// export const useNavbar =()=> useContext(NavbarContext)

// ✅ Safer custom hook
export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used within a NavbarProvider");
    }
    return context;
};