'use client'

import React, { useEffect, useState } from 'react'
import InputBar from '../components/input-bar'
import { api } from '@/trpc/react'
import { ArrowRight, Copy, Loader } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCommunity } from '../contexts/community-context'
import { useRouter } from 'next/navigation'

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
          <div className='grid grid-cols-2 md:grid-cols-3  w-full h-full gap-1'>
            {
              posts?.map((post) => (
                <Dialog key={post.id}>
                  <DialogTrigger asChild>
                    <div className='w-full h-60 lg:h-96 bg-transparent relative overflow-clip rounded-lg'>
                      <Image src={post.imageUrl} alt="image" className='object-cover h-full w-full' width={300} height={500} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className='max-w-7xl bg-transparent p-0 border-0 md:w-full w-[90%]'>
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

        </div>

        <div className='w-full min-h-0 shrink-0 flex items-center justify-center pt-4 pb-14'>
          <Button variant={'secondary'} onClick={() => router.push("/community/library")}>
            View all
            <ArrowRight />
          </Button>
        </div>
      </div>

      <InputBar />
    </div>
  )
}

export default CreatePage