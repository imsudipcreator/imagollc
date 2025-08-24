'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import ImagoIcon from '@/components/icons/imago-icon'
import { AlertCircle, Ellipsis, GalleryVerticalEnd, Loader, Pencil, PencilLine, Pin, Trash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import SearchChats from './search-chats'
import { api } from '@/trpc/react'
import { useParams, useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useSidebar } from '../contexts/SidebarContext'
import { toast } from 'sonner'
import UserFooter from '@/components/user-footer'
import { useIntelligence } from '@/contexts/intelligence-context'


// const chats = [
//     { label: "hustling-garg", href: "/chats/1234567890" },
//     { label: "silent-shadow", href: "/chats/0987654321" },
//     { label: "mhrefnight-coder", href: "/chats/1122334455" },
//     { label: "blazing-tiger", href: "/chats/2233445566" },
//     { label: "neon-knight", href: "/chats/3344556677" },
//     { label: "code-wizard", href: "/chats/4455667788" },
//     { label: "logic-lord", href: "/chats/5566778899" },
//     { label: "cyber-samurai", href: "/chats/6677889900" },
//     { label: "data-demon", href: "/chats/7788990011" },
//     { label: "matrix-mage", href: "/chats/8899001122" }
// ];


type ChatType = {
    slug: string | null;
    id: string
}

const AppSidebar = () => {
    const { slug, chatId, setSlug } = useSidebar()
    const { chats, isChatsLoading, isChatsError } = useIntelligence()
    const router = useRouter()

    const updateSlug = api.chat.updateOne.useMutation({
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: () => {
            toast.error("An error occured while updating chat slug")
        }
    })

    const deleteChat = api.chat.deleteOne.useMutation({
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: () => {
            toast.error("An error occured while deleting this chat")
        }
    })

    const handleDelete = async (chatId: string) => {
        if (!chatId) {
            toast.error("Chat id is required!")
            return
        }

        await deleteChat.mutateAsync({
            chatId
        })
    }

    const onSubmit = async (slug: string, chatId: string) => {
        if (slug.length < 2 || slug.length > 50) {
            toast.error("Chat slug should be minimum of 2 and maximum of 50 characters!")
            return
        }

        if (!chatId) {
            toast.error("Chat id is required!")
            return
        }

        await updateSlug.mutateAsync({
            chatId,
            slug
        })

    }


    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            onClick={() => router.push('/')}
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
                    <Dialog>
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
                                    isChatsError && (
                                        <SidebarMenuItem>
                                            <Alert variant={'destructive'}>
                                                <AlertCircle />
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
                                    isChatsLoading && (
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
                                <AlertDialogAction className='bg-destructive' onClick={() => handleDelete(chatId)}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        <DialogContent>
                            <DialogHeader>
                                Rename
                            </DialogHeader>
                            <div className='grid'>
                                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Chat name cannot be empty' />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant={'secondary'}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={() => onSubmit(slug, chatId)}>
                                        Rename
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </AlertDialog>
            </SidebarContent>
            <UserFooter />
        </Sidebar>
    )
}

export default AppSidebar


interface MoreChatActionTypes {
    chats: ChatType[]
}

const ChatItem = ({ chats }: MoreChatActionTypes) => {
    const router = useRouter()
    const { id } = useParams()
    const { setSlug, setChatId } = useSidebar()

    return (
        chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                    className={cn('cursor-pointer',
                        chat.id === id && 'bg-sidebar-border hover:bg-sidebar-border'
                    )}
                    onClick={() => router.push(`/intelligence/chats/${chat.id}`)}>
                    {chat.slug ?? chat.id}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='ml-auto outline-none'>
                                <Ellipsis className='size-4' />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DialogTrigger asChild onClick={() => {
                                setSlug(chat.slug ?? "")
                                setChatId(chat.id)
                            }}>
                                <DropdownMenuItem>
                                    <Pencil />
                                    Rename
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Pin />
                                Pin this chat
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger onClick={() => setChatId(chat.id)} asChild>
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