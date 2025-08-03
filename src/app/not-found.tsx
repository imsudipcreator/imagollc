// import { Button } from '@/components/systemui/button'
import ImagoSymbol from '@/components/icons/imago-symbol'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
    return (
        <div className='min-h-[500px]  w-full flex flex-col items-center justify-center gap-4'>
            <h1 className='font-semibold text-3xl w-80 text-center'>The page you&apos;re looking for can&apos;t be found.</h1>
            <Link href={'/sitemap'} className='group text-theme flex items-center gap-1'>
                <button className='group-hover:underline'>See the sitemap</button>
                <ImagoSymbol name='chevron_right' fontSize='10px'/>
            </Link>
        </div>
    )
}

export default NotFoundPage