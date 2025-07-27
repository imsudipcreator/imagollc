'use client'

import React from 'react'
import { CodeiumEditor } from "@codeium/react-code-editor";
import { useCreator } from '../contexts/creator-context';
import InputBar from './input-bar';
import { useTheme } from 'next-themes';
import { Loader } from 'lucide-react';

const ChatPage = () => {
    const { code, setCode } = useCreator()
    const { theme, systemTheme } = useTheme()
    return (
        // <div className="h-screen w-full flex flex-col">
        <div className='flex-1 flex flex-col'>
            <div className='flex-1'>
                <CodeiumEditor
                    language="html"
                    theme={systemTheme === 'dark' ? "vs-dark" : "light"}
                    className='h-[calc(100vh-30vh)]'
                    value={code}
                    onChange={(code) => setCode(code ?? "")}
                    loading={<Loader className='animate-spin'/>}
                />
                {/* <div className='h-8 absolute left-0 right-0 -bottom-4 md:-bottom-2 mx-auto bg-gradient-to-b from-transparent to-background' /> */}
            </div>
            <InputBar />

        </div>
        // </div>

    )
}

export default ChatPage