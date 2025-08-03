'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, Globe, Loader, Paperclip } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
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
import { ChatPromptBox } from '@/components/21st-dev-ui/chat-prompt-input';


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
    const myRef = useRef(null)
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
                persona: selectedPersona,
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
                <form
                    onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <FormField
                        control={form.control}
                        name='value'
                        render={({ field }) => (
                            <ChatPromptBox value={field.value} onChange={field.onChange} />
                        )}
                    />
                </form>
            </div>
        </Form>

    )
}

export default InputBar