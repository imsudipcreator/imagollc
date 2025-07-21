'use client'

import React from 'react'
import Navbar from './navbar'
import { usePathname } from 'next/navigation'

const NavbarWrapper = () => {
    const pathname = usePathname()
    const navbarExcludedRoutes = ['/intelligence', '/sign-in', '/sign-up', '/community']
    const shouldHideNavbar = navbarExcludedRoutes.some((route) => pathname.startsWith(route))

    if (shouldHideNavbar) {
        return null
    }
    return (
        <Navbar />
    )
}

export default NavbarWrapper