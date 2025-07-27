'use client'

import ImagoIcon from '@/components/icons/imago-icon'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import UserFooter from '@/components/user-footer'
import { AppWindow, Blocks, Earth, LayoutDashboard, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useCreator } from '../contexts/creator-context'

const routes = [
    { label: "Dashboard", href: "/developer/icreator/", icon: <LayoutDashboard /> },
    { label: "Websites", href: "/developer/icreator/websites", icon: <AppWindow /> },
    { label: "Community", href: "/developer/icreator/community", icon: <Earth /> },
]

const AppSidebar = () => {
    const { handleCreateNewWebsite } = useCreator()
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <ImagoIcon />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Imago Creator</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Creation</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={handleCreateNewWebsite}>
                                <Plus />
                                New Website
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarMenu>
                        {
                            routes.map(route => (
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={route.href}>
                                            {route.icon}{route.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <UserFooter />
        </Sidebar>
    )
}

export default AppSidebar