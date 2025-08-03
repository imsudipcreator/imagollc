'use client'

import React, { useRef } from 'react'
import Navbar from './navbar'
import { usePathname } from 'next/navigation'
import ExpandedNavbar from './expanded-navbar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { useUser } from '@clerk/nextjs'
import gsap from 'gsap'
import ImagoSymbol from '@/components/icons/imago-symbol'

const NavbarWrapper = () => {
    const pathname = usePathname()
    const { isSignedIn, isLoaded } = useUser()
    const navbarExcludedRoutes = ['/intelligence', '/sign-in', '/sign-up', '/community', '/developer/icreator']
    const shouldHideNavbar = navbarExcludedRoutes.some((route) => pathname.startsWith(route))
    const nativeNavbarRoutes = ['/community']
    const nativeNav = nativeNavbarRoutes.some(route => pathname.startsWith(route))
    const slideRef = useRef<HTMLDivElement>(null)


    useGSAP(() => {
        if (!isSignedIn && isLoaded && slideRef?.current) {
            gsap.to(slideRef?.current, {
                height: "40px",
                paddingTop: "5px",
                paddingBottom: "5px",
                opacity: 1
            })
        }

        // if (nativeNav) {
        //     gsap.to("#slide", {
        //         height: "0px",
        //         paddingTop: "0px",
        //         paddingBottom: "0px",
        //         opacity: 0
        //     })
        // }
    }, [isSignedIn, pathname, nativeNav])

    if (shouldHideNavbar) {
        return null
    }
    return (
        <>
            <Navbar />
            <ExpandedNavbar />
            <div
                ref={slideRef}
                className={cn(`w-full text-body md:text-sm  text-base flex flex-wrap gap-1 h-0 items-center justify-center text-center`)}
                style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    opacity: 0
                }}
            >
                <h1>Connect to imago for better experience.</h1>
                <Link href={'/sign-in'} className='inline-flex items-center text-theme group'>
                    <span className='group-hover:underline group-hover:underline-offset-1'>Connect</span>
                    <ImagoSymbol name='chevron_right' fontSize='13px' />
                </Link>
            </div>
        </>
    )
}

export default NavbarWrapper