import React from 'react'
import type { Website } from '../page'
import { Button } from '@/components/ui/button'

interface WebsiteCardProps {
    website: Website
}

const WebsiteCard = ({ website }: WebsiteCardProps) => {
    return (
        <div className='w-full min-h-52 rounded-md relative overflow-clip' style={{ backgroundImage: `url(${website.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: "gray" }}>
            {
                !website.thumbnail &&
                <div className='w-full h-[calc(100%-2rem)] flex items-center justify-center'>
                    <h1>No Preview available.</h1>
                </div>
            }
            <div className='absolute bottom-0 w-full min-h-14 bg-black/50 backdrop-blur-xl flex items-center justify-between px-2'>
                <h1 className='text-white text-lg font-semibold p-2'>{website.name}</h1>
                <div className='flex items-center gap-2 py-3'>
                    <Button onClick={() => window.open(website.url, '_blank')} variant={'secondary'} size={'sm'} className='rounded-full px-4 py-1'>
                        View
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WebsiteCard