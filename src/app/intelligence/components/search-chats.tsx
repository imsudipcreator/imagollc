import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useDebounce } from 'use-debounce';
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { api } from '@/trpc/react'
import { Loader, MessageSquare, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SearchChats = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [debouncedInput] = useDebounce(input.trim(), 300)

    const { data: messages, isLoading, refetch } = api.message.search.useQuery({
        term: debouncedInput
    }, {
        enabled: false
    })


    useEffect(() => {
        if (debouncedInput) {
            void refetch(); // manually fetch results for the current input
        }
    }, [debouncedInput, refetch])

    return (
        <>
            <SidebarMenuButton onClick={() => setOpen(true)}>
                <Search />
                Search Chats
            </SidebarMenuButton >
            <CommandDialog open={open} onOpenChange={setOpen} className=''>
                <CommandInput placeholder='Type something to search' value={input} onValueChange={setInput} />
                {
                    isLoading ? (
                        <div className='w-full h-32 flex items-center justify-center'>
                            <Loader className='animate-spin' />
                        </div>
                    ) : (
                        <CommandList>
                            <CommandEmpty>No results found</CommandEmpty>
                            {
                                messages && messages?.length > 0 && (
                                    <CommandGroup heading={'History'}>
                                        {
                                            messages?.map((message) => (
                                                <CommandItem key={message.id} value={message.content} asChild onClick={() => setOpen(false)}>
                                                    <Link href={`/intelligence/chats/${message.chatId}`} className='truncate flex items-center gap-2'>
                                                        <MessageSquare className='size-5' />
                                                        <div className='flex flex-col gap-1'>
                                                            <span className='text-sm'>
                                                                {message.chatSession.slug}
                                                            </span>
                                                            <span className='text-muted-foreground text-xs'>
                                                                {message.content}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </CommandItem>
                                            ))
                                        }
                                    </CommandGroup>
                                )
                            }

                        </CommandList>

                    )
                }

            </CommandDialog>
        </>
    )
}

export default SearchChats