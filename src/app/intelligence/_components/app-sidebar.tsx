'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React, { useEffect, useState } from 'react'
import ImagoIcon from '@/components/icons/imago-icon'
import { AlertCircle, Bell, ChevronsUpDown, CircleUser, Ellipsis, GalleryVerticalEnd, Loader, PencilLine, Pin, Search, Sparkles, Trash } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import SearchChats from './search-chats'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/alert'



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


type ChatType = {
    slug: string | null;
    id: string
}

const AppSidebar = () => {
    const isMobile = useIsMobile()
    const { isSignedIn, user } = useUser()
    const router = useRouter()
    const { data: chats, isLoading, isError } = api.chat.getMany.useQuery()

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
                                <SidebarMenuButton asChild>
                                    <Link href={'/intelligence/'}>
                                        <PencilLine />
                                        New Chat
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SearchChats />
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={'/intelligence/library'}>
                                        <GalleryVerticalEnd />
                                        Library
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
                        <SidebarGroupLabel>Chat History</SidebarGroupLabel>
                        <SidebarMenu>
                            {
                                isError && (
                                    <SidebarMenuItem>
                                        <Alert variant={'destructive'}>
                                            <AlertCircle/>
                                            <p>Something went wrong</p>
                                            <ul className='text-xs list-inside text-nowrap list-disc mt-1'>
                                                <li className=''>Check your network</li>
                                                <li>Make sure you are logged in!</li>
                                            </ul>
                                        </Alert>
                                    </SidebarMenuItem>
                                )
                            }
                            {
                                isLoading && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className=''>
                                            <Loader className='animate-spin' />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }
                            {
                                chats ? (
                                    <ChatItem chats={chats} />
                                ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton disabled variant={'outline'} className='hover:bg-none bg-transparent font-semibold text-muted-foreground'>
                                            No Chats found
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
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
                                    <SidebarMenuButton asChild>
                                        <Button variant={'default'}>
                                            <Link href={'/sign-in'}>
                                                Sign in
                                            </Link>
                                        </Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Button variant={'outline'}>
                                            <Link href={'/sign-up'}>
                                                Sign up
                                            </Link>
                                        </Button>

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


interface MoreChatActionTypes {
    chats: ChatType[]
}

const ChatItem = ({ chats }: MoreChatActionTypes) => {
    const router = useRouter()

    return (
        chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton className='cursor-pointer' onClick={() => router.push(`/intelligence/chats/${chat.id}`)}>
                    {chat.slug ?? chat.id}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='ml-auto outline-none'>
                                <Ellipsis className='size-4' />
                            </div>
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
    )

}