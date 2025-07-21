'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { Footer } from './footer'

const FooterWrapper = () => {
    const pathname = usePathname()
    const footerIncludedRoutes = ['/']
    const shouldShowFooter = footerIncludedRoutes.some((route) => pathname === route)

    if (!shouldShowFooter) {
        return null
    }
    return (
        <Footer />
    )
}

export default FooterWrapper