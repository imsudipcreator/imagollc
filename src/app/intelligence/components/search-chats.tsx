import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Search } from 'lucide-react'
import React from 'react'

const SearchChats = () => {
    return (
        <SidebarMenuButton>
            <Search />
            Search Chats
        </SidebarMenuButton>
    )
}

export default SearchChats