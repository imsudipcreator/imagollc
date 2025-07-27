import React from 'react'
import { useCreator } from '../contexts/creator-context'

const PreviewPage = () => {
    const { code } = useCreator()
    return (
        <div className='flex-1 flex'>
            <iframe srcDoc={code} className='flex-1' loading='lazy' sandbox='allow-forms allow-same-origin allow-scripts'/>
        </div>
    )
}

export default PreviewPage