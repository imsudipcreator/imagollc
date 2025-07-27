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
import { useCreator } from '../contexts/creator-context';


const formSchema = z.object({
    prompt: z
        .string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value is too long" })
})

const InputBar = () => {
    const { user } = useUser()
    const { id } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { setCode, isPending } = useCreator()
    const [isFocused, setIsFocused] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    const websiteTask = api.task.createWebsiteTask.useMutation({
        onSuccess: () => {
            toast.success("Task created successfully")
        },
        onError: (error) => {
            toast.error("Something went wrong while creating your task", {
                description: error.message
            })
        }
    })
    const generateCode = api.website.generate.useMutation({
        onSuccess: () => {
            form.reset()
        },
        onError: () => {
            toast.error("Error occurred")
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!id) {
            toast.error("Project ID could not be found")
            return
        }
        try {
            const task = await websiteTask.mutateAsync()
            await generateCode.mutateAsync({
                prompt: values.prompt,
                projectId: id as string,
                taskId: task.id
            })
        } catch (error) {
            console.log(error)
            toast.error("Error generating your website")
        }

    }


    const isLoading = websiteTask.isPending

    return (
        <Form {...form}>
            <div className='z-50 w-[94%]  min-h-0 flex max-w-3xl items-center justify-center mx-auto left-0 right-0 pb-3 bg-background rounded-t-3xl'>
                {/* <div className='h-8 absolute left-0 right-0 -top-3 mx-auto bg-gradient-to-b from-transparent to-background' /> */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        'max-w-3xl w-full p-4 rounded-3xl border border-border bg-secondary transition-colors duration-200',
                        isFocused && 'border-black'
                    )}>
                    <FormField
                        control={form.control}
                        name='prompt'
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
                            <Button variant={'outline'} className={cn('rounded-full')}>
                                <Globe />
                                Search the web
                            </Button>
                        </div>

                        <div className='flex'>
                            <Button type='submit' disabled={!form.formState.isValid || isPending || isLoading} size={'icon'} className='rounded-full'>
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