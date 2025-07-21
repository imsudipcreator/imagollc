import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { copyTextToClipboard } from '@/utils/copy-to-clipboard'
import { downloadImage } from '@/utils/image-downloader'
import { ArrowDownToLine, Copy, Globe, GlobeLock, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


interface PostCardProps {
    imageUrl: string
    prompt: string
    isPublished: boolean
    postId: string
}

export const PostCard = ({ imageUrl, prompt, isPublished, postId }: PostCardProps) => {
    const [isPublic, setIsPublic] = useState(isPublished)
    const togglePublic = api.communityPost.togglePublishPost.useMutation({
        onSuccess: (data) => {
            setIsPublic(data.public)
        }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='w-full h-60 lg:h-96 bg-transparent relative overflow-clip rounded-lg'>
                    <Image src={imageUrl} alt="image" className='object-cover h-full w-full' width={300} height={500} />
                </div>
            </DialogTrigger>
            <DialogContent className='max-w-7xl bg-transparent p-0 border-0 md:w-full w-[90%]'>
                <DialogTitle className='sr-only'>
                    Image
                </DialogTitle>
                <div className="relative w-full overflow-clip rounded-md bg-transparent">
                    <Image src={imageUrl} className='h-full w-full object-contain' width={300} height={300} alt='image' />
                    <div className='w-full bg-transparent flex items-center absolute bottom-0 justify-between px-4 py-3'>
                        <Hint message={prompt}>
                            <Button onClick={() => copyTextToClipboard(prompt, "Could not copy prompt to clipboard")} variant={'secondary'} className='cursor-pointer rounded-full flex items-center justify-center bg-background/60 backdrop-blur-lg text-sm'>
                                <Copy />
                                Copy prompt
                            </Button>
                        </Hint>


                        <div className='flex items-center gap-2.5'>
                            <Hint message='Download'>
                                <Button onClick={() => downloadImage(imageUrl)} variant={'secondary'} size={'icon'} className='bg-background/60 backdrop-blur-lg rounded-full cursor-pointer'>
                                    <ArrowDownToLine />
                                </Button>
                            </Hint>
                            <Hint message={isPublic ? "unpublish" : "publish"}>
                                <Button onClick={() => togglePublic.mutateAsync({ postId })} variant={'secondary'} size={'icon'} className='cursor-pointer rounded-full bg-background/60 backdrop-blur-lg'>
                                    {isPublic ? <Globe /> : <GlobeLock />}
                                </Button>
                            </Hint>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}



interface ExplorePostCardProps {
    imageUrl: string
    prompt: string
    fullname: string
    postId: string
    liked: boolean
    likesLength: number
}

const heights = ["h-96", "h-[30rem]", "h-64", "h-80"];

export const ExplorePostCard = ({ imageUrl, fullname, prompt, liked, likesLength, postId }: ExplorePostCardProps) => {
    const [height, setHeight] = useState(heights[Math.floor(Math.random() * heights.length)])
    const [likes, setLikes] = useState(likesLength)
    const [isLiked, setIsLiked] = useState(liked)
    const likePost = api.communityPost.likePost.useMutation({
        onSuccess: (data) => {
            setIsLiked(data.liked)
            setLikes(data.likesLength)
        },
        onError: () => {
            toast.error("something went wrong while liking the post")
        }
    })
    const randomHeight = () => {
        setHeight(heights[Math.floor(Math.random() * heights.length)])
    }

    useEffect(() => {
        randomHeight()
    }, [])

    return (
        <Dialog>
            <div className={cn('w-full bg-transparent relative overflow-clip rounded-lg ',
                height
            )}>
                <DialogTrigger asChild>
                    <Image src={imageUrl} alt="image" className='object-cover h-full w-full' width={300} height={500} />
                </DialogTrigger>
                <div className='w-full bg-transparent absolute flex items-center justify-between p-2 bottom-0 text-white '>
                    <p className='md:text-base text-sm'>{fullname}</p>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => likePost.mutateAsync({ postId })} variant={'ghost'} size={'sm'} className='rounded-full'>
                            {isLiked ? <ThumbsUp className='fill-white' /> : <ThumbsUp />}
                            <span>{likes}</span>
                        </Button>
                    </div>
                </div>
            </div>
            <DialogContent className='max-w-7xl bg-transparent p-0 border-0 md:w-full w-[90%]'>
                <DialogTitle className='sr-only'>
                    Image
                </DialogTitle>
                <div className="relative w-full overflow-clip rounded-md bg-transparent">
                    <Image src={imageUrl} className='h-full w-full object-contain' width={300} height={300} alt='image' />
                    <div className='w-full bg-transparent flex items-center absolute bottom-0 justify-between px-4 py-3'>
                        <Hint message={prompt} align='start'>
                            <Button onClick={() => copyTextToClipboard(prompt, "Could not copy prompt to clipboard")} variant={'secondary'} className='cursor-pointer rounded-full flex items-center justify-center bg-background/60 backdrop-blur-lg text-sm'>
                                <Copy />
                                Copy prompt
                            </Button>
                        </Hint>
                        <div className='flex items-center gap-3'>
                            <Hint message='Download'>
                                <Button onClick={() => downloadImage(imageUrl)} variant={'secondary'} size={'icon'} className='bg-background/60 backdrop-blur-lg rounded-full cursor-pointer'>
                                    <ArrowDownToLine />
                                </Button>
                            </Hint>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}