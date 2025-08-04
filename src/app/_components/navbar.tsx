/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'

import ImagoIcon from "@/components/icons/imago-icon"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { routes } from "@/constants/routes"
import Link from "next/link"
import ImagoSymbol from "@/components/icons/imago-symbol"
import { useNavbar } from "@/contexts/home/navbar-context"
import AnimatedHamburger from "@/components/animated-hamburger"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

// Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//     { href: "#", label: "Home" },
//     {
//         label: "Features",
//         submenu: true,
//         type: "description",
//         items: [
//             {
//                 href: "#",
//                 label: "Components",
//                 description: "Browse all components in the library.",
//             },
//             {
//                 href: "#",
//                 label: "Documentation",
//                 description: "Learn how to use the library.",
//             },
//             {
//                 href: "#",
//                 label: "Templates",
//                 description: "Pre-built layouts for common use cases.",
//             },
//         ],
//     },
//     {
//         label: "Pricing",
//         submenu: true,
//         type: "simple",
//         items: [
//             { href: "#", label: "Product A" },
//             { href: "#", label: "Product B" },
//             { href: "#", label: "Product C" },
//             { href: "#", label: "Product D" },
//         ],
//     },
//     {
//         label: "About",
//         submenu: true,
//         type: "icon",
//         items: [
//             { href: "#", label: "Getting Started", icon: "BookOpenIcon" },
//             { href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
//             { href: "#", label: "About Us", icon: "InfoIcon" },
//         ],
//     },
// ]


interface NavbarProps {
    position?: string
}

export default function Navbar({ position }: NavbarProps) {
    const { isSignedIn } = useUser()
    const { setOpenedNav, openedNav, openedSubRoutes, setOpenedSubRoutes, closeNavs } = useNavbar()
    const closeSubRouteRef = useRef<HTMLButtonElement>(null)

    function handleMouseHover(label: string) {
        const hoveredRoute = routes.find((item) => item.label === label)
        const hasChildren = hoveredRoute?.children

        if (hasChildren) {
            setOpenedNav(hoveredRoute.label.toLowerCase())
        }
    }


    useGSAP(() => {
        const target = closeSubRouteRef?.current
        if (!target) return
        if (openedSubRoutes !== null) {
            target.classList.remove("pointer-events-none");

            gsap.fromTo(target, {
                opacity: 0,
                x: 20,
                scale: 0
            }, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5
            })
        } else {
            gsap.to(target, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                onComplete: () => {
                    target.classList.add("pointer-events-none")
                }
            })
        }

    }, [openedSubRoutes, openedNav])
    return (
        <nav className={cn("md:h-11 h-12 z-50 w-full flex items-center text-[#1D1D1F] justify-center sticky top-0 backdrop-blur-md transition-all duration-200",
            openedNav ? "bg-white" : "bg-white/80", position
        )}>
            {/**Desktop Navbar */}
            <div className="w-full max-w-[61rem] h-full lg:flex hidden items-center justify-between">
                <Link href={'/'}>
                    <ImagoIcon className={'hover:text-black'} />
                </Link>
                {
                    routes.map((route) => (
                        <Link
                            onMouseEnter={() => handleMouseHover(route.label)}
                            key={route.href} href={route.href}
                            className={cn("text-[13px] hover:text-black")}
                        >
                            {route.label}
                        </Link>
                    ))
                }
                <button className="cursor-pointer flex items-center justify-center hover:text-black" onClick={() => { if (openedNav !== 'search') setOpenedNav('search') }}>
                    <ImagoSymbol fontSize="20px" name="search" />
                    {/* <Search01Icon className="size-[17px]" color="#333333"/> */}
                </button>
                <button onClick={() => setOpenedNav(prev => prev === 'profile' ? null : 'profile')} className="cursor-pointer flex items-center justify-center hover:text-black">
                    <ImagoSymbol fontSize="20px" name="person_crop_circle_badge_exclam" />
                </button>
            </div>

            {/**Device Navbar */}
            <div className="lg:hidden flex w-[92%] items-center justify-between">
                <div className="flex items-center h-full relative">
                    <Link href={'/'} className={`${openedNav ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} duration-500 `}>
                        <ImagoIcon size={16} />
                    </Link>
                    <button ref={closeSubRouteRef} onClick={() => openedSubRoutes !== null && setOpenedSubRoutes(null)} className={cn("flex items-center justify-center absolute left-0 top-0 scale-100", openedSubRoutes === null && 'pointer-events-none   opacity-0')}>
                        <ImagoSymbol fontSize="20px" name="chevron_left" />
                    </button>
                </div>

                <div className="flex items-center gap-7">
                    <button onClick={() => setOpenedNav(prev => prev === 'search' ? null : 'search')}
                        className={`cursor-pointer flex items-center justify-center ${openedNav ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} duration-500`}
                    >
                        <ImagoSymbol fontSize="20px" name="search" />
                        {/* <Search01Icon className="size-[17px]" color="#333333"/> */}
                    </button>
                    <button onClick={() => setOpenedNav(prev => prev === 'profile' ? null : 'profile')}
                        className={`cursor-pointer flex items-center justify-center ${openedNav ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} duration-500`}>
                        <ImagoSymbol fontSize="20px" name="person_crop_circle_badge_exclam" />
                    </button>

                    <AnimatedHamburger toggle={() => openedNav !== null ? closeNavs() : setOpenedNav('menu')} isOpen={openedNav} />
                </div>
            </div>
        </nav>
    )
}
