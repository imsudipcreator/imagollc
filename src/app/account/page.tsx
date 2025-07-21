'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/trpc/react'
import { nameShortener } from '@/utils/nameShortener'
import { useUser } from '@clerk/nextjs'
import { BadgeCheck, CalendarClock, Loader, Mail } from 'lucide-react'
import React from 'react'
import CommunityInteractChart from './components/community-interact-chart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AccountPage = () => {
    const router = useRouter()
    const { user: clerkUserData, isLoaded } = useUser()
    const { data: dbUserData, isLoading } = api.user.getUser.useQuery()
    const { data: communityPostsPeakData, isPending: postsLoading } = api.communityPost.getPosts.useQuery({
        limit: 8
    })
    if (isLoading || !isLoaded) {
        return (
            <div className='flex-1 flex items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }
    return (
        <div className='flex-1 w-full flex flex-col px-4 py-3 max-w-[80rem] items-center min-h-svh gap-2 overflow-y-auto'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full shrink-0'>
                <Card className='flex flex-col relative '>
                    <Badge variant={'default'} className='absolute top-5 right-5'>
                        Free
                    </Badge>
                    <CardHeader className='gap-y-1'>
                        <Avatar className='size-14 mb-2'>
                            <AvatarImage src={clerkUserData?.imageUrl} alt='avatar' />
                            <AvatarFallback>{nameShortener(clerkUserData?.fullName ?? "Null Null")}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{dbUserData?.fullname}</CardTitle>
                        <CardDescription>No description provided</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant={'ghost'} className='flex items-center gap-2 pointer-events-none text-muted-foreground'>
                            <Mail />
                            <span>{clerkUserData?.emailAddresses[0]?.emailAddress}</span>
                            <Badge variant={'default'} className='bg-theme '>
                                <BadgeCheck />
                                Verified
                            </Badge>
                        </Button>
                        <Button variant={'ghost'} className='flex items-center gap-2 pointer-events-none text-muted-foreground'>
                            <CalendarClock />
                            <span>{clerkUserData?.lastSignInAt?.toLocaleString() ?? "N/A"}</span>
                        </Button>
                    </CardContent>
                </Card>
                <CommunityInteractChart />
            </div>
            {
                communityPostsPeakData && communityPostsPeakData?.length > 0 && (
                    <div className='grid grid-cols-2 shrink-0 w-full min-h-0'>
                        <Card className='col-span-2'>
                            <CardHeader>
                                <CardTitle>Community Gallery</CardTitle>
                            </CardHeader>
                            <CardContent className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 relative'>
                                {
                                    communityPostsPeakData?.map((data) => (
                                        <Image src={data.imageUrl} alt='image' key={data.id} className='aspect-square w-full' width={200} height={200} />
                                    ))
                                }
                                <div className='absolute bottom-0 bg-gradient-to-b from-transparent to-background w-full h-1/2 flex items-center justify-center'>
                                    <Button onClick={() => router.push('/community/library')}>
                                        View all
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }

        </div>
    )
}

export default AccountPage