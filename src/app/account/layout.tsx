import type { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
    title : "Account | Imago llc"
}

function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full min-h-svh flex flex-col items-center'>
            {children}
        </main>
    )
}

export default AccountLayout
