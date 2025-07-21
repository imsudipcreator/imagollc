'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { GalleryVerticalEnd, Origami, Pen, ThumbsUp, Trophy } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const applicationItems = [
    { label: "Explore", icon: Origami, href: '/community' },
    { label: "Library", icon: GalleryVerticalEnd, href: '/community/library' },
    { label: "Create", icon: Pen, href: '/community/create' },
    { label: "Top", icon: Trophy, href: '/community/top' },
    { label: "Likes", icon: ThumbsUp, href: '/community/likes' },
]
const Tabbar = () => {
    const pathname = usePathname()
    const isMobile = useIsMobile()


    if(!isMobile){
        return null
    }
    return (
        <div className='absolute bottom-0 w-full bg-background/60 h-12 backdrop-blur-md flex items-center justify-between px-7'>
            {
                applicationItems.map((item) =>(
                    <Link href={item.href} key={item.label} className={cn(' px-2 py-1.5 rounded-md',
                        pathname === item.href && 'bg-foreground/10'
                    )}>
                        <item.icon/>
                    </Link>
                ))
            }
        </div>
    )
}

export default Tabbar