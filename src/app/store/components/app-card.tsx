import React from 'react'
import type { App } from '../page'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


interface AppCardProps {
    app: App
}

const AppCard = ({ app }: AppCardProps) => {
    return (
        <div className={cn('w-full min-h-14  flex gap-2')}>
            <div className='rounded-xl aspect-square h-[74px] border border-border/90 overflow-clip'>
                <Image src={app.app_logo} alt={app.app_name} width={100} height={100} className='object-cover h-full scale-150' />
            </div>

            <div className='flex-1 border-b border-border pb-6 flex items-center justify-between'>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{app.app_name}</h3>
                    <h4 className='truncate text-muted-foreground'>{app.app_slogan}</h4>
                    <p className='text-muted-foreground text-sm'>{app.creator_name}</p>
                </div>
                <div className='min-w-4 flex flex-col items-center gap-2 justify-center'>
                    <Button onClick={() => window.open(app.download_link, '_self')} variant={'secondary'} className='px-6 md:px-4 text-base md:text-sm rounded-full hover:bg-black/10 transition-colors duration-300'>
                        Get
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AppCard