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


const formSchema = z.object({
    value: z
        .string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value is too long" })
})

const InputBar = () => {
    const [selectedWebSearch, setSelectedWebSearch] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })

    const generateResponse = api.ai.generateResponse.useMutation({
        onSuccess: (data) => {
            toast.success(data.assistant)
        },
        onError: () => {
            toast.error("something went wrong")
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const response = await generateResponse.mutateAsync({
            input: values.value
        })

        console.log(response)
    }


    const isPending = generateResponse.isPending

    return (
        <Form {...form}>
            <div className='w-full flex items-center justify-center pb-3 relative'>
                <div className='h-6 absolute left-0 right-0 -top-6 bg-gradient-to-b from-transparent to-background' />
                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className={cn(
                    'max-w-3xl w-full p-4 rounded-3xl border border-border mx-3.5 transition-colors duration-200',
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
                                    isPending ? <Loader className='animate-spin'/> : <ArrowUp className='size-5' />
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