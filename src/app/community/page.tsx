'use client'

import UserMenu from '@/components/originui/user-menu'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { useUser } from '@clerk/nextjs'
import { Filter, Grid2X2, Loader, Rows3 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ExplorePostCard } from './components/post-card'


const columns = [
  { icon: <Rows3 />, value: "column-1 lg:columns-2", placeholder: "List" },
  { icon: <Grid2X2 />, value: "columns-2 lg:columns-3", placeholder: "Grid" },
]

const CommunityPage = () => {
  const { user } = useUser()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [selectedColumn, setSelectedColumn] = useState(columns[0]?.value ?? "column-1 lg:columns-2")
  const { data, isLoading: postFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = api.communityPost.getAllPosts.useInfiniteQuery(
    {
      limit: 6
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  const posts = data?.pages.flatMap(page => page.posts) ?? []


  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const loadMore = loadMoreRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void fetchNextPage()
        }
      },
      {
        threshold: 1
      }
    )


    if (loadMore) {
      observer.observe(loadMore)
    }


    return () => {
      if (loadMore) {
        observer.unobserve(loadMore)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])
  if (postFetching) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    )
  }
  return (
    <div className='h-fit min-h-svh w-full flex flex-col items-center justify-start overflow-y-auto px-4 gap-2 pb-24'>
      <nav className='w-full h-14 flex items-center justify-between shrink-0'>
        <h1 className='font-semibold text-lg'>Explore</h1>
        <div className='flex items-center gap-2'>
          <LayoutSelect selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} />
          <Button variant={'ghost'}>
            <Filter />
          </Button>
          <UserMenu />
        </div>
      </nav>
      <div className={cn('w-full min-h-0 shrink-0 gap-x-2 space-y-2',
        selectedColumn
      )}>
        {
          posts?.map((post) => (
            <ExplorePostCard
              key={post.id}
              fullname={post.user.fullname}
              liked={post.likes.some(like => like.userId === user?.id)}
              imageUrl={post.imageUrl}
              likesLength={post.likes.length}
              postId={post.id}
              prompt={post.prompt}
            />
          ))
        }
      </div>
      {
        isFetchingNextPage && (
          <div className='w-full bg-transparent py-3 mt-6 flex items-center justify-center'>
            <Loader className='animate-spin' />
          </div>
        )
      }
      <div ref={loadMoreRef} className="h-10" />
    </div>
  )
}

export default CommunityPage




interface LayoutSelectProps {
  selectedColumn: string
  setSelectedColumn: React.Dispatch<React.SetStateAction<string>>
}

const LayoutSelect = ({ selectedColumn, setSelectedColumn }: LayoutSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          {columns.find(c => c.value === selectedColumn)?.icon ?? <Grid2X2 />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Layout</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selectedColumn} onValueChange={setSelectedColumn}>
          {
            columns.map(column => (
              <DropdownMenuRadioItem value={column.value} key={column.value}>
                {column.icon}
                <span>{column.placeholder}</span>
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}