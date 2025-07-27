import React from 'react'
import { useCreator } from '../contexts/creator-context'

const PreviewPage = () => {
    const { code } = useCreator()
    return (
        <div className='flex-1 flex'>
            <iframe srcDoc={code} className='flex-1' loading='lazy'/>
        </div>
    )
}

export default PreviewPage