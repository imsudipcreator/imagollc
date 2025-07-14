'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Globe, Paperclip } from 'lucide-react';
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const InputBar = () => {
    const [selectedWebSearch, setSelectedWebSearch] = useState(false)
    return (
        <div className='w-full flex items-center justify-center pb-3 relative'>
            <div className='h-6 absolute left-0 right-0 -top-6 bg-gradient-to-b from-transparent to-background' />
            <div className='max-w-3xl w-full p-4 rounded-2xl border border-border mx-3.5'>
                <TextareaAutosize
                    minRows={2}
                    maxRows={8}
                    className='resize-none bg-transparent w-full outline-none'
                    placeholder='Ask intelligence...'
                />
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1.5'>
                        <Button variant={'secondary'} size={'icon'} className='rounded-full'>
                            <Paperclip />
                        </Button>
                        <Button onClick={() => setSelectedWebSearch(prev => !prev)} variant={'outline'} className={cn('rounded-full',selectedWebSearch && 'text-blue-500')}>
                            <Globe />
                            Search the web
                        </Button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default InputBar