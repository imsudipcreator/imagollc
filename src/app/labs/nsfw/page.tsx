'use client'

import React, { useState } from 'react'
import { PromptInput, PromptInputAction, PromptInputActions, PromptInputTextarea } from './components/prompt-input'
import { Button } from '@/components/ui/button'
import { ArrowUp, Square } from 'lucide-react'
import { BackgroundGradient } from './components/bg-gradient'
import { toast } from 'sonner'
import { set } from 'date-fns'


const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
];


const NSFWPage = () => {
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState("")

    const handleSubmit = () => {
        if(input === ""){
            toast.error("Please enter a prompt")
            return
        }
        try {
            setIsLoading(true)
            setImage(`https://image.pollinations.ai/prompt/${input}`)
        } catch{
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleValueChange = (value: string) => {
        setInput(value)
    }
    return (
        <section className='max-w-[61rem] w-[92%] md:w-full h-svh flex flex-col'>
            <header className='h-12 w-full flex items-center justify-between'>
                <h1 className='font-semibold text-2xl'>NSFW</h1>
            </header>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <BackgroundGradient/>
                <div className='flex-1 w-full flex items-center justify-center bg-amber-500'>
                    {image !== '' && (
                        <img src={image} alt="Generated image" className='w-full h-fit object-cover' />
                    )}
                </div>
                <div className='w-full flex items-center justify-center pb-2'>
                    <PromptInput
                        value={input}
                        onValueChange={handleValueChange}
                        isLoading={isLoading}
                        onSubmit={handleSubmit}
                        className="w-full max-w-[350px]"
                    >
                        <PromptInputTextarea placeholder="Ask me anything..." />
                        <PromptInputActions className="justify-end pt-2">
                            <PromptInputAction
                                tooltip={isLoading ? "Stop generation" : "Send message"}
                            >
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? (
                                        <Square className="size-5 fill-current" />
                                    ) : (
                                        <ArrowUp className="size-5" />
                                    )}
                                </Button>
                            </PromptInputAction>
                        </PromptInputActions>
                    </PromptInput>
                </div>
            </div>
        </section>
    )
}

export default NSFWPage