"use client"

import Image from 'next/image';
import React, { useEffect } from 'react'
import { prismGradient, imagoLaptop, goofyCards, appsSet, imagoLock, imagoTiles } from '../../../public/assets/store'
import ImagoSymbol from '@/components/icons/imago-symbol';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/lib/supabase';
import AppCard from './components/app-card';
import WebsiteCard from './components/website-card';


const DiscoverData = [
    {
        id: 1,
        header: (
            <h1 className="font-semibold text-white text-2xl">
                First ever store created for the webs in a web.
            </h1>
        ),
        bgImage: imagoLaptop,
        featuredImage: null,
        description: "Imago’s iStore is more than a catalog—it's a revolution. Discover innovative web tools, crafted to blend form and function beautifully, all from one immersive space.",
        bgColor: "#F5F5F5"
    },
    {
        id: 2,
        header: (
            <h1 className="font-semibold text-2xl">
                Every Imago creation. One seamless space.
            </h1>
        ),
        featuredImage: <Image src={goofyCards} alt='goofy card' className='w-64' />,
        description: "No more hopping between pages. All Imago’s finest creations—apps, sites, tools—brought together in a space that's simple, smart, and completely free of extra charges.",
        bgColor: "#ffa914"
    },
    {
        id: 3,
        header: (
            <h1 className="font-semibold text-2xl">
                Web magic. At your fingertips.
            </h1>
        ),
        bgImage: prismGradient,
        featuredImage: null,
        description: "Browse a growing gallery of high-impact web apps. Whether it’s a portfolio, a business tool, or a concept brought to life—you’ll find ready-to-launch experiences crafted for speed and style.",
        bgColor: "#1D1D1F"
    },
    {
        id: 4,
        header: (
            <h1 className="font-semibold text-2xl text-white">
                Preview live. Choose smart.
            </h1>
        ),
        featuredImage: <ImagoSymbol fontSize='120px' className='text-white mr-auto' name='wand_stars_inverse' />,
        description: "Make decisions in real time. With interactive previews, you can explore how every project feels and functions—before making it part of your stack.",
        bgColor: "#007BFE"
    },
    {
        id: 5,
        header: (
            <h1 className="font-semibold text-2xl">
                The apps you love.From a place you can trust.
            </h1>
        ),
        featuredImage: <Image src={appsSet} className='w-64' alt='apps set' />,
        description: "Imago's App Store, launched just two months ago, is quickly becoming a trusted and secure platform for discovering and downloading apps. It’s more than a marketplace — it’s an innovative space dedicated to delivering exceptional experiences.",
        bgColor: "#F5F5F5"
    },
    {
        id: 6,
        header: (
            <h1 className="font-semibold text-2xl text-white">
                Security for every app. At every level.
            </h1>
        ),
        featuredImage: <Image src={imagoLock} className='select-none' alt='apps set' />,
        description: "Our focus is on upholding the highest standards of privacy, security, and content quality, ensuring that every app you explore meets your expectations. We ensure that apps come from known sources, are free of known malware and haven’t been tampered with at the time of installation or launch.",
        bgColor: "#007AFE"
    },
    {
        id: 7,
        header: (
            <h1 className="font-semibold  text-2xl text-black">
                You choose what data to share. And with whom.
            </h1>
        ),
        featuredImage: <Image src={imagoTiles} className='' alt='apps set' />,
        description: " Each app is required to ask for your permission so you can choose what data to share. The first time a third‑party app wants to access your information — like your location, contacts, calendars or photos — you receive an alert. Even if you grant access once, you can revoke it later.",
        bgColor: "#F5F5F5"
    },
];


export type App = {
    id: number;
    created_at: Date;
    app_name: string;
    download_link: string;
    app_slogan: string;
    app_logo: string;
    creator_name: string
}

export type Website = {
    id: number;
    created_at: Date;
    name: string;
    thumbnail: string;
    url: string;
}

const StorePage = () => {
    const isMobile = useIsMobile()
    const [openedDescId, setOpenedDescId] = React.useState<number | null>(null);
    const [isWebsiteFetching, setIsWebsiteFetching] = React.useState<boolean>(false)
    const [isAppFetching, setIsAppFetching] = React.useState<boolean>(false)
    const [apps, setApps] = React.useState<App[]>([])
    const [websites, setWebsites] = React.useState<Website[]>([])

    const toggleDesc = (id: number) => {
        if (openedDescId === id) {
            setOpenedDescId(null)
        } else {
            setOpenedDescId(id)
        }
    }


    const fetchAppsSnippet = async () => {
        try {
            setIsAppFetching(true)
            const { data, error } = await supabase.from("apps").select("id, created_at, app_name, download_link, app_slogan, app_logo, creator_name").order('created_at', { ascending: false })
            if (data) {
                console.log(data)
                setApps(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsAppFetching(false)
        }
    }

    const fetchWebsSnippet = async () => {
        try {
            setIsWebsiteFetching(true)
            const { data, error } = await supabase.from("websites").select("id, created_at, name, thumbnail, url").order('created_at', { ascending: false })
            if (data) {
                console.log(data)
                setWebsites(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsWebsiteFetching(false)
        }
    }


    useEffect(() => {
        void fetchAppsSnippet()
        void fetchWebsSnippet()
    }, [])

    return (
        <section className='min-h-screen w-full pt-4 flex flex-col items-center justify-start gap-6'>
            <div className='flex flex-col md:gap-2 gap-1 w-full h-[490px] md:h-[400px] overflow-hidden '>
                <h1 className='md:px-36 px-5 text-2xl font-semibold'>Discover</h1>
                <div className='overflow-x-auto no-scrollbar flex items-center justify-start gap-6 w-full md:px-36 px-5'>
                    {
                        DiscoverData.map((discover) => (
                            <div
                                key={discover.id}
                                style={{
                                    backgroundImage: `url(${(discover.bgImage)?.src})`,
                                    backgroundColor: discover.bgColor ?? 'white',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                className={`flex flex-col justify-start gap-2 shrink-0 md:rounded-md rounded-lg h-[90%] aspect-[3/4] overflow-clip relative`}
                            >
                                <div className='flex flex-col gap-6 md:gap-4 p-5'>
                                    {discover.header}
                                    {discover.featuredImage}
                                </div>
                                <button onClick={() => toggleDesc(discover.id)} className='cursor-pointer p-1 flex items-center justify-center rounded-full absolute bottom-4 right-4 z-20 bg-secondary'>
                                    <ImagoSymbol name='plus' fontSize={isMobile ? '28px' : '24px'} className={cn(openedDescId === discover.id ? 'rotate-45' : '', "transition-transform duration-300")} styles={{ fontWeight: 'bold' }} />
                                </button>
                                <div className={cn('w-full h-full text-xl overflow-y-scroll no-scrollbar font-medium bg-black text-white absolute p-5 transition-all duration-500', openedDescId === discover.id ? 'opacity-100' : 'opacity-0')}>
                                    {discover.description}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/** Apps Section */}
            <div className='w-[92%] max-w-[61rem] md:w-full flex flex-col md:gap-2 gap-1'>
                <h1 className='text-2xl font-semibold '>Apps</h1>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-5'>
                    {
                        isAppFetching && <ImagoSymbol name='rays' fontSize='20px' className='text-black animate-spin min-h-20' />
                    }
                    {
                        apps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))
                    }
                </div>
            </div>

            {/** Webs Section */}
            <div className='w-[92%] max-w-[61rem] md:w-full flex flex-col md:gap-2 gap-1'>
                <h1 className='text-2xl font-semibold '>Websites</h1>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-5'>
                    {
                        isWebsiteFetching && <ImagoSymbol name='rays' fontSize='20px' className='text-black animate-spin min-h-20' />
                    }
                    {
                        websites.map((website) => (
                            <WebsiteCard key={website.id} website={website} />
                        ))
                    }
                </div>
            </div>


            {/** More Items */}
            <div className='w-[92%] max-w-[61rem] md:w-full min-h-96 text-3xl font-semibold text-black/30 flex flex-col items-center justify-center'>
                <h1 className='text-center'>More Items on the way. {"\n"} Stay tuned.</h1>
            </div>

            <section className='bg-[#f5f5f7] text-black/50 mt-10 pt-7 w-full flex items-center justify-center'>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line w-[92%] md:max-w-[980px] border-b border-border pb-8">
                    **Apps available on iStore are developed by Imago LLC as well as independent developers and creators who choose to distribute their apps through the Imago ecosystem. While we maintain a strict quality control process for submissions and reserve the right to remove any content that violates our guidelines, Imago LLC does not directly verify or monitor the source code, functionality, or data handling practices of third-party applications submitted to iStore unless otherwise stated.

                    All applications are provided &quot;as-is&quot; without warranties of any kind, either express or implied. Users are responsible for evaluating the accuracy, reliability, compatibility, and security of each app prior to use. For apps developed by third-party creators, Imago LLC makes no guarantees regarding continued functionality, support, or updates.

                    By using any application listed on iStore, you agree that Imago LLC will not be held liable for any damages, data loss, misuse, or personal harm resulting from the use of these applications. You are advised to read each app&apos;s individual privacy policy and terms of use (where applicable) before installation.

                    {"\n\n"}*Some apps may collect limited information such as analytics, crash data, or preferences solely to enhance user experience. However, no app on iStore may collect sensitive data (such as passwords, payment details, or personal identity documents) without clear user consent and transparency. Apps that violate this rule will be permanently removed from the platform.

                    iStore, Imago LLC, and its logo are trademarks owned by Sudip Mahata. Unauthorized reproduction, reverse engineering, or redistribution of apps or brand elements is strictly prohibited. Use of this site and any applications implies acceptance of our <a href="/policy/privacy" className="underline underline-offset-2">Privacy Policy</a> and <a href="/policy/terms" className="underline underline-offset-2">Terms of Service</a>.

                    For inquiries, developer onboarding, or copyright concerns, please visit our <a href="/contact" className="underline underline-offset-2">Contact page</a>.
                </p>
            </section>
        </section>
    )
}

export default StorePage