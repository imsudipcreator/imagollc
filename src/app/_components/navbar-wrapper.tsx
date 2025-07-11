'use client'

import React from 'react'
import Navbar from './navbar'
import { usePathname } from 'next/navigation'

const NavbarWrapper = () => {
    const pathname = usePathname()
    const navbarExcludedRoutes = ['/intelligence']
    const shouldHideNavbar = navbarExcludedRoutes.some((route) => route === pathname)

    if (shouldHideNavbar) {
        return null
    }
    return (
        <Navbar />
    )
}

export default NavbarWrapper