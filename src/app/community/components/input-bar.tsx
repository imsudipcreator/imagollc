import { Form, FormField } from '@/components/ui/form'
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ArrowUp, Loader, Type } from 'lucide-react';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { useCommunity } from '../contexts/community-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { prompts } from '@/constants/prompts';


const formSchema = z.object({
    value: z.string().min(1, { message: "Query cannot be empty" }).max(500, { message: "Query cannot exceed 500 characters" })
})

const InputBar = () => {
    const { setIsPending } = useCommunity()
    const [isFocused, setIsFocused] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })
    const createTask = api.task.createImageTask.useMutation({
        onSuccess: () => {
            toast.success("Task created successfully")
        },
        onError: (error) => {
            toast.error("Something went wrong while creating your task", {
                description: error.message
            })
        }
    })

    const createCommunityPost = api.communityPost.createPost.useMutation({
        onSuccess: () => {
            toast.success("Community post is in queue")
            form.reset()
        },
        onError: (error) => {
            toast.error("Something went wrong while creating your task", {
                description: error.message
            })
        }
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { id } = await createTask.mutateAsync()
        setIsPending(true)
        await createCommunityPost.mutateAsync({
            prompt: values.value,
            taskId: id
        })

    }

    const isPending = createTask.isPending


    return (
        <Form {...form}>
            <div className='md:w-full w-[94%] flex max-w-3xl items-center justify-center mx-auto left-0 right-0 pb-1 absolute bottom-0 md:bg-transparent bg-background rounded-t-xl'>
                {/* <div className='h-6 absolute left-0 right-0 -top-6 bg-gradient-to-b from-transparent to-background' /> */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        'max-w-3xl w-full p-4 rounded-xl border border-border transition-colors duration-200 bg-sidebar',
                        isFocused && 'border-foreground'
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
                                placeholder='Describe an image...'
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
                        <div className='flex'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'outline'} className='rounded-full'>
                                        <Type />
                                        <span className=''>{"Prompts"}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-72' align='start'>
                                    <DropdownMenuLabel>Demo Prompts</DropdownMenuLabel>
                                    <DropdownMenuGroup className=''>
                                        {
                                            prompts.map((prompt) => (
                                                <DropdownMenuItem key={prompt} title={prompt} className='truncate w-full max-w-[260px]' onClick={() => form.setValue("value", prompt, { shouldValidate : true})}>
                                                    <span>
                                                        {prompt}
                                                    </span>
                                                </DropdownMenuItem>
                                            ))
                                        }

                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
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