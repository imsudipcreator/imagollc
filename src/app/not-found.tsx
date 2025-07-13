import { Button } from '@/components/ui/button'
import { CloudAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='min-h-svh w-full flex flex-col gap-8 items-center justify-center text-center'>
            <CloudAlert className='size-24 text-orange-300'/>
            <h1 className='font-semibold text-3xl px-12'>The page you are looking for couldn&apos;t be found!</h1>
            <Button>
                <Link href={'/'}>
                    Go back to home
                </Link>
            </Button>
        </div>
    )
}

export default NotFoundPage