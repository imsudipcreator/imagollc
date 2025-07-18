'use client'

import ImagoIcon from '@/components/icons/imago-icon'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Origami, Pen, ThumbsUp, Trophy } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const applicationItems = [
    { label: "Explore", icon: Origami, href: '/community' },
    { label: "Top", icon: Trophy, href: '/community/top' },
    { label: "Likes", icon: ThumbsUp, href: '/community/likes' },
    { label: "Create", icon: Pen, href: '/community/library' },
]

const AppSidebar = () => {
    const pathName = usePathname()
    const isMobile = useIsMobile()


    if (isMobile) {
        return null
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <Button variant={'ghost'} size={'lg'} className='flex items-center justify-center gap-1.5'>
                    <ImagoIcon />
                    <span className='font-semibold text-xl'>Community</span>
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
        </Sidebar>
    )
}

export default AppSidebar