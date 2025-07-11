'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { Footer } from './footer'

const FooterWrapper = () => {
    const pathname = usePathname()
    const footerExcludedRoutes = ['/intelligence']
    const shouldHideFooter = footerExcludedRoutes.some((route) => route === pathname)

    if (shouldHideFooter) {
        return null
    }
    return (
        <Footer />
    )
}

export default FooterWrapper