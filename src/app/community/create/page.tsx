'use client'

import React, { useEffect, useState } from 'react'
import InputBar from '../components/input-bar'
import { api } from '@/trpc/react'
import { ArrowRight, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCommunity } from '../contexts/community-context'
import { useRouter } from 'next/navigation'
import { PostCard } from '../components/post-card'

const CreatePage = () => {
  const router = useRouter()
  const { isPending: isTaskFetchPending, data: tasks, refetch: refetchTasks } = api.task.getImageTasks.useQuery()
  const { data: posts, refetch: refetchPosts } = api.communityPost.getPosts.useQuery({
    limit: 6
  })
  const { isPending, setIsPending } = useCommunity()
  const [counter, setCounter] = useState(0)




  useEffect(() => {
    if (tasks && tasks?.length > 0) {
      setIsPending(true)
    } else {
      console.log("stopped")
      void refetchPosts()
      setIsPending(false)
    }
  }, [tasks, setIsPending, refetchPosts])

  useEffect(() => {
    if (isPending && counter < 20) {
      console.log("calling")
      setCounter(prev => prev++)
      const refetchInterval = setInterval(() => { void refetchTasks() }, 1000)
      return () => clearInterval(refetchInterval)
    }

  }, [isPending, refetchTasks, counter])

  if (isTaskFetchPending) {
    return (
      <div className='flex-1 flex justify-center items-center'>
        <Loader className='animate-spin' />
      </div>
    )
  }
  return (
    <div className='md:flex-1 w-full h-[86vh] relative flex flex-col items-center min-h-0 overflow-hidden gap-10 pt-3'>
      <div className='w-full md:px-7 px-3 min-h-0 flex flex-col items-center gap-4 overflow-y-auto pb-32 '>
        {
          tasks && tasks.length > 0 && (
            <div className='w-full min-h-0 flex flex-col  gap-2.5 shrink-0'>
              <h1 className='font-semibold text-lg'>Tasks</h1>
              <div className='grid grid-cols-2 md:grid-cols-3 w-full h-full gap-2.5'>
                {
                  tasks.map((task) => (
                    <div className='h-60 w-full animate-pulse bg-secondary rounded-2xl flex flex-col gap-3.5 items-center justify-center text-center p-3' key={task.id}>
                      <span>{task.status}</span>
                      <span className='text-sm'>Task ID: {task.id}</span>
                    </div>
                  ))
                }
              </div>

            </div>
          )
        }

        <div className='w-full min-h-0 flex flex-col  gap-2.5 shrink-0'>
          <h1 className='font-semibold text-lg'>Recent Images</h1>
          {
            posts && posts.length === 0 && (
              <div className='w-full min-h-20 flex items-center justify-center text-muted-foreground text-center'>
                No images found. Create one
              </div>
            )
          }
          <div className='grid grid-cols-2 md:grid-cols-3  w-full h-full gap-1'>
            {
              posts?.map((post) => (
                <PostCard key={post.id} imageUrl={post.imageUrl} isPublished={post.public} prompt={post.prompt} postId={post.id} />
              ))
            }
          </div>

        </div>
        {
          posts && posts?.length > 5 && (
            <div className='w-full min-h-0 shrink-0 flex items-center justify-center pt-4 pb-14'>
              <Button variant={'secondary'} onClick={() => router.push("/community/library")}>
                View all
                <ArrowRight />
              </Button>
            </div>
          )
        }

      </div>

      <InputBar />
    </div>
  )
}

export default CreatePage