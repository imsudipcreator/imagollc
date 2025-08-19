/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavbar } from '@/contexts/home/navbar-context'
import { useIsMobile } from '@/hooks/use-mobile'
import gsap from 'gsap'
import { useDebounce } from '@/hooks/use-debounce'
import { quickLinks, routes } from '@/constants/routes'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ImagoSymbol from '@/components/icons/imago-symbol'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useStaggerFadeIn } from '@/hooks/use-staggered-fade-in'

type SearchableRoutes = {
    label: string
    href: string
}

const ExpandedNavbar = () => {
    const { isSignedIn, user } = useUser()
    const router = useRouter()
    const isMobile = useIsMobile()
    const translucentDivRef = useRef<HTMLDivElement>(null)
    const bgDivRef = useRef<HTMLDivElement>(null)
    const subRouteDivRef = useRef<HTMLDivElement>(null)
    const opaqueDivRef = useRef<HTMLDivElement>(null)
    const { openedNav, setOpenedNav, closeNavs, setOpenedSubRoutes, openedSubRoutes } = useNavbar()
    const [searchResults, setSearchResults] = useState<SearchableRoutes[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [query, setQuery] = useState("")
    const routeDivRef = useRef<HTMLDivElement>(null)
    const debouncedQuery = useDebounce(query, 300)
    const animationRef = useRef<gsap.core.Timeline | null>(null)
    const subRouteAnimRef = useRef<gsap.core.Timeline | null>(null)

    const developerRoute = routes.find((route) => route.label === 'Developer')
    const supportRoute = routes.find((route) => route.label === 'Support')
    const legalRoute = routes.find((route) => route.label === 'Legal')
    const aboutRoute = routes.find((route) => route.label === 'About')


    const searchDivRef = useStaggerFadeIn(openedNav === 'search', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })


    const developerDivRef = useStaggerFadeIn(openedNav === 'developer', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })

    const supportDivRef = useStaggerFadeIn(openedNav === 'support', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })

    const legalDivRef = useStaggerFadeIn(openedNav === 'legal', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })

    const aboutDivRef = useStaggerFadeIn(openedNav === 'about', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })


    const linksRef = useStaggerFadeIn(openedNav === 'search', {
        delay: 0.2,
        stagger: 0.03,
        y: -10
    })


    const routeElemsRef = useStaggerFadeIn(openedNav === 'menu', {
        delay: 0.2,
        stagger: 0.03,
        y: -8
    })


    const navMap = {
        developer: {
            label: 'Developer Tools',
            data: developerRoute,
            refs: developerDivRef
        },
        support: {
            label: 'Support Routes',
            data: supportRoute,
            refs: supportDivRef
        },
        legal: {
            label: 'Legal Routes',
            data: legalRoute,
            refs: legalDivRef
        },
        about: {
            label: 'About us',
            data: aboutRoute,
            refs: aboutDivRef
        }
    };

    const currentNav = navMap[openedNav as keyof typeof navMap];


    async function globalSearch(query: string) {
        const searchTerm = query?.trim().toLowerCase()
        // let apps: SearchableApps[] = []
        // let websites: SearchableWebsites[] = []



        // const [appsResult, websiteResult] = await Promise.all([
        //     supabase.from("apps").select("app_name, app_id").ilike("app_name", `%${searchTerm}%`),
        //     supabase.from("websites").select("name").ilike("name", `%${searchTerm}%`)
        // ])


        // if (appsResult.data) {
        //     apps = appsResult.data.map((app) => ({
        //         title: app.app_name,
        //         href: `/apps/${app.app_id}`,
        //         type: "App",
        //     })) as SearchableApps[];
        // }


        // if (websiteResult.data) {
        //     websites = websiteResult.data.map((website) => ({
        //         title: website.name,
        //         href: `/websites`,
        //         type: "Website",
        //     })) as SearchableWebsites[];
        // }

        // routes
        const nativeRoutes = routes.flatMap((route) => {
            const matchesParent = route.label.toLowerCase().includes(searchTerm)
                ? [{
                    label: route.label,
                    href: route.href,
                }]
                : [];

            const matchesChildren = route.children
                ? route.children
                    .filter((child) => child.label.toLowerCase().includes(searchTerm))
                    .map((child) => ({
                        label: child.label,
                        href: child.href,

                    }))
                : [];

            return [...matchesParent, ...matchesChildren];
        }) as SearchableRoutes[];


        return [...nativeRoutes]

    }

    function handleMobileRouteClick(label: string) {
        const clickedRoute = routes.find((route) => route.label === label)
        const hasChildren = clickedRoute?.children
        if (!hasChildren) {
            router.push(clickedRoute?.href ?? '/')
            setOpenedNav(null)
            return
        }

        if (clickedRoute?.label) setOpenedSubRoutes(clickedRoute?.label)
    }

    const activeRoute = useMemo(() => {
        return routes.find((route) => route.label === openedSubRoutes);
    }, [openedSubRoutes]);


    useEffect(() => {
        async function handleSearch(query: string) {
            if (query.length === 0) setSearchResults([])
            if (query.length < 2) return
            const result = await globalSearch(query)
            setSearchResults(result)


        }

        void handleSearch(debouncedQuery)

    }, [debouncedQuery, setSearchResults])

    useGSAP(() => {
        const translucentDiv = translucentDivRef.current
        const bgDiv = bgDivRef.current
        const opaqueDiv = opaqueDivRef.current

        if (!translucentDiv || !opaqueDiv) return
        if (animationRef.current) {
            animationRef.current.kill()
            animationRef.current = null
        }

        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })
        animationRef.current = tl

        if (openedNav !== null) {
            if (!bgDiv) return
            translucentDiv.style.pointerEvents = 'auto'
            gsap.set(bgDiv, { paddingTop: "28px" });

            tl.to(translucentDiv, { opacity: 1 })
                .to(opaqueDiv, { height: window.innerWidth < 1024 ? '100vh' : 400 }, "-=0.3")
                .to(bgDiv, { height: '100%' }, "-=0.2")
        } else {
            tl.to(opaqueDiv, { height: 0 })
                .to(translucentDiv, {
                    opacity: 0,
                    onComplete: () => {
                        translucentDiv.style.pointerEvents = 'none';
                        if (bgDiv) {
                            gsap.set(bgDiv, { paddingTop: "0px" });
                        }
                    }
                });
        }

        // Optional: return cleanup to prevent stacking
        return () => {
            tl.kill();
            animationRef.current = null;
        };


    }, [openedNav])


    useGSAP(() => {
        const subRouteDiv = subRouteDivRef?.current;
        const routeDiv = routeDivRef?.current;
        if (!subRouteDiv || !routeDiv) return;

        // Kill existing animation
        if (subRouteAnimRef.current) {
            subRouteAnimRef.current.kill();
            subRouteAnimRef.current = null;
        }

        const tl = gsap.timeline();

        if (openedSubRoutes !== null) {
            subRouteDiv.classList.remove("pointer-events-none");

            tl.to(routeDiv, {
                x: -20,
                opacity: 0,
                duration: 0.3,
            }).fromTo(subRouteDiv,
                { x: 20 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                }
            );
        } else {
            tl.to(subRouteDiv, {
                x: 20,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    subRouteDiv.classList.add("pointer-events-none");
                },
            }).to(routeDiv, {
                x: 0,
                opacity: 1,
                duration: 0.5,
            });
        }

        subRouteAnimRef.current = tl;

        return () => {
            tl.kill();
            subRouteAnimRef.current = null;
        };
    }, [openedSubRoutes]);


    useEffect(() => {
        if (typeof window === "undefined") return; //ssr safe
        if (window.innerWidth < 1024) return
        const handleScroll = (e: Event) => {
            // console.log("Scrolled!", e);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])


    useEffect(() => {
        console.log("useEffect running"); // debug
        if (typeof window === "undefined") return; //ssr safe


        if (window.innerWidth <= 1024) {
            document.body.style.overflow = openedNav ? 'hidden' : 'auto'
        }


        if (openedNav === 'search') {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 500)
        } else {
            inputRef.current?.blur()
        }

        return () => {
            document.body.style.overflow = "auto"; // cleanup
        };

    }, [openedNav]);



    const menuItems = [
        {
            label: "My account",
            href: "/account",
            icon: {
                name: "gear",
                fontSize: "16px"
            }
        },
        {
            label: "Notifications",
            href: "/account",
            icon: {
                name: "bell"
            } // or you can skip this field
        },
        {
            label: "My Plan",
            href: "/account",
            icon: {
                name: "flame"
            }
        }
    ];

    return (
        <section ref={translucentDivRef} className='backdrop-blur-md h-[calc(200vh)] bg-background/30 w-full md:top-11 top-12 z-[100] opacity-0 fixed'>
            <div onMouseLeave={isMobile ? () => null : closeNavs} ref={opaqueDivRef} className='w-full fixed top-0 overflow-hidden flex items-start justify-center bg-background overflow-y-scroll no-scrollbar'>
                {openedNav === 'search' && (
                    <div ref={bgDivRef} className='lg:max-w-[61rem] lg:w-full w-[77%] flex flex-col justify-start gap-4'>
                        <div ref={searchDivRef(0)} className='w-full flex items-center gap-2 h-14 mb-4'>
                            <i className="f7-icons text-[#707070] " style={{ fontSize: '30px' }}>
                                search
                            </i>
                            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} type="text" className='h-full w-full border-none outline-none placeholder:text-2xl placeholder:font-semibold text-2xl font-semibold  bg-transparent' placeholder='Search imago' />
                        </div>
                        {
                            searchResults.length === 0 ? (
                                <ResultSection
                                    refFunc={linksRef}
                                    title='Quick Links'
                                    results={quickLinks}
                                    handleClick={() => setOpenedNav(null)}

                                />
                            ) : (

                                <ResultSection
                                    refFunc={linksRef}
                                    title={"Pages"}
                                    results={searchResults}
                                    handleClick={() => setOpenedNav(null)}
                                />

                            )
                        }


                    </div>
                )}

                {openedNav === 'profile' && (
                    <div ref={bgDivRef} className='lg:max-w-[61rem] lg:w-full w-[77%]  flex flex-col  gap-1.5'>
                        {
                            !isSignedIn ? (
                                <>
                                    <h1 className='text-3xl font-semibold'>You&apos;re not signed in!</h1>
                                    <p><Link className='text-[#007AFF] underline' href={'/sign-in'}>Sign in</Link> to sneak peek into your account</p>
                                </>

                            ) : (
                                <div className='w-full text-wrap flex flex-col gap-4'>
                                    <h1 className='text-xl font-semibold'>{`Hi, ${user?.emailAddresses[0]?.emailAddress}`}</h1>
                                    <p className='text-accent-foreground'>This section is currently under development. Please consider visiting your account from the links provided below.</p>
                                    <div className='flex flex-col gap-2 mt-4'>
                                        <h1 className='font-medium text-muted-foreground'>My Profile</h1>
                                        <ul className='space-y-1.5'>
                                            {
                                                menuItems.map(item => (
                                                    <li key={item.label} onClick={closeNavs}>
                                                        <Link href={item.href} className='flex items-center gap-2 cursor-pointer'>
                                                            <ImagoSymbol name={item.icon.name} />
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li onClick={closeNavs}>
                                                <SignOutButton>
                                                    <button className='flex items-center gap-2 cursor-pointer'>
                                                        <ImagoSymbol name="power" />
                                                        Log out
                                                    </button>
                                                </SignOutButton>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )
                        }

                    </div>
                )}

                {
                    currentNav?.data && (
                        <div ref={bgDivRef} className='lg:max-w-[61rem] w-full lg:flex flex-col hidden gap-1.5'>
                            <p ref={currentNav?.refs(0)} className={cn('text-muted-foreground text-sm')}>{currentNav.label}</p>
                            <Link
                                ref={currentNav?.refs(1)}
                                href={currentNav.data?.href ?? '/'}
                                className={cn('text-3xl font-semibold')}
                            >
                                {`Explore ${currentNav?.data?.label}`}
                            </Link>
                            {currentNav.data?.children?.map((route, i) => (
                                <Link
                                    ref={currentNav?.refs(i + 2)} href={route.href ?? '/'}
                                    className={cn('font-semibold text-2xl')}
                                    key={route.label}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    )
                }

                {openedNav === 'menu' && (
                    <div ref={bgDivRef} className='flex flex-col items-start gap-4 w-full  h-full relative'>
                        <div ref={routeDivRef} className='flex flex-col items-start gap-4 px-12 py-6 h-full w-full '>
                            {
                                routes.map((route, index) => (
                                    <button
                                        ref={routeElemsRef(index)}
                                        onClick={() => handleMobileRouteClick(route.label)}
                                        aria-label={`Navigate to ${route.label}`}
                                        key={index}
                                        className='font-semibold text-3xl'>
                                        {route.label}
                                    </button>
                                ))
                            }
                        </div>

                        <div ref={subRouteDivRef} className={cn('absolute w-full h-full flex flex-col items-start gap-2.5 px-12 py-6 opacity-0 bg-white font-semibold text-2xl pointer-events-none')}>
                            <p className='text-[1rem] text-muted-foreground'>{`${activeRoute?.label} Routes`}</p>
                            <Link onClick={closeNavs} href={activeRoute?.href ?? "/"} className='text-3xl'>{`Explore ${activeRoute?.label}`}</Link>
                            {activeRoute?.children?.map((subRoute) => (
                                <Link onClick={closeNavs} key={subRoute.label} href={subRoute.href}>
                                    {subRoute.label}
                                </Link>
                            ))}
                        </div>



                    </div>
                )}

            </div>
        </section>
    )
}

export default ExpandedNavbar



interface ResultSectionType {
    title: string
    results: SearchableRoutes[]
    handleClick: () => void
    refFunc: any
}


function ResultSection({ title, results, refFunc, handleClick }: ResultSectionType) {
    const { navTheme } = useNavbar()
    return (
        <div ref={refFunc(0)} className='w-full min-h-8 flex flex-col'>
            <h1 className='text-[#707070] text-lg mb-2 md:text-base'>
                {title}
            </h1>
            <div className='flex flex-col gap-1'>
                {
                    results.map((result, index) => (
                        <Link
                            ref={refFunc(index + 1)}
                            onClick={handleClick}
                            href={result.href ?? "/"}
                            key={index || result.href || result.label}
                            className={cn('flex items-center gap-3 cursor-pointer py-1 w-full rounded-[7px] group'
                            )}>
                            <ImagoSymbol name='arrow_right' className={cn("f7-icons text-[#707070] group-hover:font-semibold group-hover:text-black", navTheme === 'dark' ? 'group-hover:text-white' : '')} fontSize={window.innerWidth < 768 ? '16px' : '14px'} />
                            <span className={cn('text-body text-lg md:text-[13px] font-semibold text-[#333333]')}>
                                {result.label ?? result.label}
                            </span>

                        </Link>
                    ))
                }
            </div>
        </div>
    )
}