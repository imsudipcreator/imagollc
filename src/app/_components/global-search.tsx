'use client'

import { Button } from '@/components/ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { ArrowUpRightIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { navigationLinks, quickLinks } from '@/constants/routes'
import { useDebounce } from '@/hooks/use-debounce'
import Link from 'next/link'

type SearchableRoutes = {
    icon: React.JSX.Element;
    label: string;
    href: string;
    type: "Page" | "App" | "Website"
}

const GlobalSearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 300)
    const [searchResults, setSearchResults] = useState<SearchableRoutes[]>([])
    useEffect(() => {
        const openSearch = (e: KeyboardEvent) => {
            if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(open => !open)
            }
        }

        document.addEventListener('keydown', openSearch)
        return () => document.removeEventListener("keydown", openSearch)
    }, [])


    const globalSearch = async (query: string) => {
        const trimmedQuery = query.trim().toLowerCase()

        const pages: SearchableRoutes[] = navigationLinks.flatMap((route) => {
            const matchedParents = route.label.toLowerCase().includes(trimmedQuery) && !route.items ?
                [{
                    icon: <ArrowUpRightIcon />,
                    label: route.label,
                    href: route.href,
                    type: "Page" as const
                }] : []

            const matchedChilds = route.items ?
                route.items.filter((child) => child.label.toLowerCase().includes(trimmedQuery))
                    .map((child) => ({
                        icon: <ArrowUpRightIcon />,
                        label: child.label,
                        href: child.href,
                        type: "Page" as const

                    })) : []


            return [...matchedParents, ...matchedChilds]
        })


        return [...pages]
    }


    // console.log(query)
    useEffect(() => {
        const getSearchResults = async (query: string) => {
            if (query.length > 0) {
                const results = await globalSearch(query);
                // console.log("results: ", results)
                setSearchResults(results)
            }
        };

        void getSearchResults(debouncedQuery);
    }, [debouncedQuery]);

    return (
        <div className='flex items-center justify-center'>
            <Button variant={'ghost'} size={'sm'} onClick={() => setOpen(open => !open)}>
                <SearchIcon />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." value={query} onValueChange={(e) => setQuery(e)} />
                {/* <Input value={query} onChange={(e) => setQuery(e.target.value)}/> */}
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {
                            quickLinks.map((link) => (
                                <CommandItem asChild key={link.label}>
                                    <Link href={link.href}>
                                        <link.icon />
                                        {link.label}
                                    </Link>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                    <CommandSeparator />
                    {
                        ["Page", "App", "Website"].map((type) => {
                            const filtered = searchResults.filter((result) => result.type === type)
                            // console.log('filtered: ', filtered)
                            return filtered.length > 0 ? (
                                <ResultSection
                                    heading={type + 's'}
                                    key={type}
                                    results={filtered}
                                />
                            ) : null
                        })
                    }

                </CommandList>
            </CommandDialog>
        </div>
    )
}

export default GlobalSearch



interface ResultProps {
    heading: string;
    results: SearchableRoutes[]
}


const ResultSection = ({
    heading,
    results
}: ResultProps) => {
    return (
        <CommandGroup heading={heading}>
            {
                results.map((result) => (
                    <CommandItem key={result.label} value={result.label} asChild>
                        <Link href={result.href} className=''>
                            {result.icon}
                            {result.label}
                        </Link>

                    </CommandItem>
                ))
            }
        </CommandGroup>
    )
}