import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title : "iStore",
    description : "A hub for all imago apps and websites"
}

function StoreLayout({ children } : {children : React.ReactNode}) {
  return (
    <main>
        {children}
    </main>
  )
}

export default StoreLayout
