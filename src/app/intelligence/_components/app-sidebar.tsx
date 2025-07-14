'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import ImagoIcon from '@/components/icons/imago-icon'
import { Bell, ChevronsUpDown, CircleUser, Ellipsis, GalleryVerticalEnd, PencilLine, Pin, Plus, Search, Sparkles, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'



const chats = [
    { label: "hustling-garg", href: "/chats/1234567890" },
    { label: "silent-shadow", href: "/chats/0987654321" },
    { label: "mhrefnight-coder", href: "/chats/1122334455" },
    { label: "blazing-tiger", href: "/chats/2233445566" },
    { label: "neon-knight", href: "/chats/3344556677" },
    { label: "code-wizard", href: "/chats/4455667788" },
    { label: "logic-lord", href: "/chats/5566778899" },
    { label: "cyber-samurai", href: "/chats/6677889900" },
    { label: "data-demon", href: "/chats/7788990011" },
    { label: "matrix-mage", href: "/chats/8899001122" }
];


const AppSidebar = () => {
    const isMobile = useIsMobile()
    const { isSignedIn, user } = useUser()
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <ImagoIcon className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="font-medium">Imago Intelligence</span>
                                <span className="text-xs">{"v1.5.0"}</span>
                            </div>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <AlertDialog>
                    <SidebarGroup>
                        <SidebarGroupLabel>Playground</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <PencilLine />
                                    New Chat
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Search />
                                    Search Chats
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <GalleryVerticalEnd />
                                    Library
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
                        <SidebarGroupLabel>Chat History</SidebarGroupLabel>
                        <SidebarMenu>
                            {
                                chats.map(chat => (
                                    <SidebarMenuItem key={chat.href}>
                                        <SidebarMenuButton>
                                            {chat.label}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button  className='ml-auto outline-none'>
                                                        <Ellipsis className='size-4'/>
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Pin />
                                                        Pin this chat
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem variant='destructive'>
                                                            <Trash />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }

                        </SidebarMenu>
                    </SidebarGroup>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove this chat from your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {
                        isSignedIn ? (
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            size={'lg'}
                                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                                        >
                                            <Avatar>
                                                <AvatarImage src={user?.hasImage ? user?.imageUrl : undefined} />
                                                <AvatarFallback>KK</AvatarFallback>
                                            </Avatar>
                                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                                <span className='truncate font-medium'>{user?.emailAddresses[0]?.emailAddress}</span>
                                                <span className='truncate text-xs'>{`${user?.firstName} ${user.lastName}`}</span>
                                            </div>
                                            <ChevronsUpDown className='ml-auto' />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                                        side={isMobile ? 'bottom' : 'right'}
                                        align='end'
                                        sideOffset={4}
                                    >
                                        <DropdownMenuLabel>
                                            <div className='flex items-center gap-2  px-1 py-1.5 text-left text-sm'>
                                                <Avatar>
                                                    <AvatarImage src={user?.hasImage ? user?.imageUrl : undefined} />
                                                    <AvatarFallback>KK</AvatarFallback>
                                                </Avatar>
                                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                                    <span className='truncate font-medium'>{user?.emailAddresses[0]?.emailAddress}</span>
                                                    <span className='truncate font-normal text-xs'>{`${user?.firstName} ${user.lastName}`}</span>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Sparkles />
                                                Upgrade your plan
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={'/account'}>
                                                <DropdownMenuItem>
                                                    <CircleUser />
                                                    Account
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={'/account'}>
                                                <DropdownMenuItem>
                                                    <Bell />
                                                    Notifications
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ) : (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Link href={'/sign-in'}>
                                            Sign in
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Link href={'/sign-up'}>
                                            Sign up
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>

                        )
                    }

                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar