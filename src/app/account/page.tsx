'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/trpc/react'
import { nameShortener } from '@/utils/nameShortener'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { BadgeCheck, CalendarClock, Loader, Mail } from 'lucide-react'
import React, { useState } from 'react'
import CommunityInteractChart from './components/community-interact-chart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ImagoSymbol from '@/components/icons/imago-symbol'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'

const AccountPage = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
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
        <div className='flex-1 md:w-full flex flex-col w-[92%] py-3 max-w-[61rem] items-center min-h-svh gap-2 overflow-y-auto'>
            <div className='w-full flex items-center justify-between border-b border-[#f5f1f3] pb-2 mb-3.5'>
                <h1 className='text-2xl font-semibold'>Account</h1>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <button className='flex items-center gap-1 text-theme cursor-pointer'>
                            <span>Sign out</span>
                            <ImagoSymbol name='power' fontSize='14px' />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='flex flex-col bg-[#E9E9E9] p-0'>
                        <div className='flex-1 text-center p-5 flex flex-col items-center gap-2'>
                            <h1 className='font-semibold text-2xl'>Are you sure?</h1>
                            <p className='max-w-[80%] w-full text-muted-foreground'>You are about to sign out from imago account. Some services might be affected by this behaviour</p>
                        </div>
                        <AlertDialogFooter className='w-full min-h-14 grid grid-cols-2 border-t border-black/20 gap-0'>
                            <button onClick={() => setOpen(false)} className='col-span-1 cursor-pointer flex items-center justify-center border-r border-black/20 hover:bg-black/10 transition-colors duration-200'>
                                Cancel
                            </button>
                            <div className='col-span-1 cursor-pointer flex items-center justify-center text-destructive hover:bg-black/10 transition-colors duration-200'>
                                <SignOutButton>
                                    Sign Out
                                </SignOutButton>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full shrink-0'>
                <Card className='flex flex-col relative '>
                    <div className='flex items-center gap-2 absolute top-5 right-5'>
                        <Badge variant={'default'} className='bg-theme '>
                            <ImagoSymbol name='checkmark_seal' fontSize='12px' />
                            Verified
                        </Badge>
                        <Badge variant={'default'} className=''>
                            Free
                        </Badge>
                    </div>
                    <CardHeader className='gap-y-1'>
                        <Avatar className='size-14 mb-2'>
                            <AvatarImage src={clerkUserData?.imageUrl} alt='avatar' />
                            <AvatarFallback>{nameShortener(clerkUserData?.fullName ?? "Null Null")}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{dbUserData?.fullname}</CardTitle>
                        <CardDescription>No description provided</CardDescription>
                    </CardHeader>
                    <CardContent className=' px-3'>
                        <Button variant={'ghost'} className='flex items-center gap-2 pointer-events-none text-muted-foreground'>
                            <ImagoSymbol name='envelope' fontSize='16px' />
                            <span>{clerkUserData?.emailAddresses[0]?.emailAddress}</span>
                        </Button>
                        <Button variant={'ghost'} className='flex items-center gap-2 pointer-events-none text-muted-foreground'>
                            <ImagoSymbol name='clock' fontSize='16px' />
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