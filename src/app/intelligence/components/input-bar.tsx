'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, Globe, Loader, Paperclip } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod';
import { Form, FormField } from '@/components/ui/form';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useIntelligence } from '@/contexts/intelligence-context';
import type { Model } from '@/types/intel-types';


const formSchema = z.object({
    value: z
        .string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value is too long" })
})

const InputBar = () => {
    const { user } = useUser()
    const { id } = useParams()
    const router = useRouter()
    const { setIsGeneratingResponse, setMessages, selectedModel, selectedPersona, customPrompt } = useIntelligence()
    const [selectedWebSearch, setSelectedWebSearch] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const { data: messages, refetch } = api.message.getHistoryforAi.useQuery({
        chatId: id as string
    }, {
        enabled: !!id
    })
    console.log(messages)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })

    const generateResponse = api.ai.generate.useMutation({
        onSuccess: () => {
            // console.log("response generated")
            void refetch()
        }
    })

    const createMessage = api.message.create.useMutation({
        onSuccess: () => {
            form.reset()
            toast.success("success")
            setIsGeneratingResponse({
                state: true,
                log: "Generating"
            })
            // console.log("data", data)

        },
        onError: () => {
            toast.error("something went wrong")
        }
    })

    const createChat = api.chat.create.useMutation({
        onSuccess: (data) => {
            router.push(`/intelligence/chats/${data}`)
        },
        onError: () => {
            toast.error("Error creating chat")
        }
    })



    const getChatId = async (): Promise<string> => {
        if (!user?.id) throw new Error("User id not found")
        const chatId = id as string | undefined

        if (!chatId) {
            const newChatId = await createChat.mutateAsync()
            return newChatId
        }

        return chatId
    }



    const getHistory = () => {
        const history = messages?.map((message) => ({
            sender: message.role,
            content: message.content
        }))

        return history ?? []
    }




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!user?.id) {
            toast.error("User id could not be found")
            return
        }
        try {
            const chatId = await getChatId()
            const message = await createMessage.mutateAsync({
                input: values.value,
                chatId: chatId,
                model: selectedModel as Model,
                history: getHistory()
            })

            setMessages((prev) => [
                ...prev,
                message
            ])
            setIsGeneratingResponse({
                state: true,
                log: "Thinking"
            })

            const aiMessage = await generateResponse.mutateAsync({
                chatId,
                prompt: values.value,
                model: selectedModel as Model,
                persona : selectedPersona,
                history: getHistory(),
                customPrompt
            })

            setMessages((prev) => [
                ...prev,
                aiMessage
            ])
            // console.log("aiMessageOnFrontend", aiMessage)
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsGeneratingResponse({
                state: false,
                log: ""
            })
        }


    }


    const isPending = createMessage.isPending || createChat.isPending

    return (
        <Form {...form}>
            <div className='md:w-full w-[94%] flex max-w-3xl items-center justify-center mx-auto left-0 right-0 pb-3 absolute bottom-0 bg-background rounded-t-3xl'>
                {/* <div className='h-6 absolute left-0 right-0 -top-6 bg-gradient-to-b from-transparent to-background' /> */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        'max-w-3xl w-full p-4 rounded-3xl border border-border transition-colors duration-200',
                        isFocused && 'border-black'
                    )}>
                    <FormField
                        control={form.control}
                        name='value'
                        render={({ field }) => (
                            <TextareaAutosize
                                {...field}
                                minRows={2}
                                maxRows={8}
                                className='resize-none bg-transparent w-full outline-none'
                                placeholder='Ask intelligence...'
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                        e.preventDefault()
                                        await form.handleSubmit(onSubmit)(e)
                                    }
                                }}
                            />
                        )}
                    />

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1.5'>
                            <Button variant={'secondary'} size={'icon'} className='rounded-full'>
                                <Paperclip />
                            </Button>
                            <Button onClick={() => setSelectedWebSearch(prev => !prev)} variant={'outline'} className={cn('rounded-full', selectedWebSearch && 'text-blue-500')}>
                                <Globe />
                                Search the web
                            </Button>
                        </div>

                        <div className='flex'>
                            <Button type='submit' disabled={!form.formState.isValid || isPending} size={'icon'} className='rounded-full'>
                                {
                                    isPending ? <Loader className='animate-spin' /> : <ArrowUp className='size-5' />
                                }
                            </Button>
                        </div>
                    </div>
                </form>

            </div>
        </Form>

    )
}

export default InputBar