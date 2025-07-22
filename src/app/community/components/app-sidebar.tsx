'use client'

import ImagoIcon from '@/components/icons/imago-icon'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { ArrowUpRight, GalleryVerticalEnd, Origami, Pen, ThumbsUp, Trophy } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'


const applicationItems = [
    { label: "Explore", icon: Origami, href: '/community' },
    { label: "Top", icon: Trophy, href: '/community/top' },
    { label: "Likes", icon: ThumbsUp, href: '/community/likes' },
    { label: "Library", icon: GalleryVerticalEnd, href: '/community/library' },
    { label: "Create", icon: Pen, href: '/community/create' },
]

const AppSidebar = () => {
    const pathName = usePathname()
    const isMobile = useIsMobile()
    const router = useRouter()


    if (isMobile) {
        return null
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <Button variant={'ghost'} size={'lg'} className='flex items-center justify-center gap-1.5'>
                    <ImagoIcon />
                    <Link href={'/'} className='font-semibold text-xl'>Community</Link>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                applicationItems.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild className={cn(item.href === pathName && 'bg-muted font-semibold')}>
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button onClick={() => router.push('/')} variant={'outline'} className='cursor-pointer'>
                    Go to home
                    <ArrowUpRight />
                </Button>
                <Button onClick={() => router.push('/intelligence')} className='cursor-pointer'>
                    Visit intelligence
                    <ArrowUpRight />
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar