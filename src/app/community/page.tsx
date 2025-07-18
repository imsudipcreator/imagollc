'use client'

import UserMenu from '@/components/originui/user-menu'
import React from 'react'

const CommunityPage = () => {
  return (
    <div className='h-fit min-h-svh w-full flex flex-col items-center justify-start'>
        <nav className='w-full h-12 bg-amber-600 flex items-center justify-between px-4'>
            <h1 className='font-semibold'>Explore</h1>
            <UserMenu/>
        </nav>
    </div>
  )
}

export default CommunityPage