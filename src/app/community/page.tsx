'use client'

import UserMenu from '@/components/originui/user-menu'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { useUser } from '@clerk/nextjs'
import { Copy, Filter, Grid2X2, Loader, Rows3, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'


const heights = ["h-96", "h-[30rem]", "h-64", "h-80"];


const randomHeight = () => {
  return heights[Math.floor(Math.random() * heights.length)]
}


const columns = [
  { icon: <Rows3 />, value: "column-1 lg:columns-2", placeholder: "List" },
  { icon: <Grid2X2 />, value: "columns-2 lg:columns-3", placeholder: "Grid" },
]

const CommunityPage = () => {
  const { user } = useUser()
  const utils = api.useUtils()
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
  const likePost = api.communityPost.likePost.useMutation({
    onSuccess: () => {
      toast.success("Liked the post")
      // void utils.communityPost.getAllPosts.invalidate()
    },
    onError: () => {
      toast.error("something went wrong while liking the post")
    }
  })


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
            <Dialog key={post.id}>
              <DialogTrigger asChild>
                <div className={cn('w-full bg-transparent relative overflow-clip rounded-lg ',
                  randomHeight()
                )}>
                  <Image src={post.imageUrl} alt="image" className='object-cover h-full w-full' width={300} height={500} />
                  <div className='w-full bg-transparent absolute flex items-center justify-between p-2 bottom-0 text-white '>
                    <p className='md:text-base text-sm'>{post.user.fullname}</p>
                    <div className='flex items-center gap-2'>
                      <Button onClick={() => likePost.mutateAsync({ postId: post.id })} variant={'ghost'} size={'sm'} className='rounded-full'>
                        {post.likes.some(like => like.userId === user?.id) ? <ThumbsUp className='fill-white' /> : <ThumbsUp />}
                        <span>{post.likes.length}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-7xl bg-transparent p-0 border-0 md:w-full w-[90%]'>
                <DialogTitle className='sr-only'>
                  Image
                </DialogTitle>
                <div className="relative w-full overflow-clip rounded-md bg-transparent">
                  <Image src={post.imageUrl} className='h-full w-full object-contain' width={300} height={300} alt='image' />
                  <div className='w-full bg-transparent flex items-center absolute bottom-0 justify-between px-4 py-3'>
                    <Button variant={'secondary'} className='cursor-pointer rounded-full flex items-center justify-center bg-background/60 backdrop-blur-lg tex-sm'>
                      <Copy />
                      Copy prompt
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
  const isMobile = useIsMobile()
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