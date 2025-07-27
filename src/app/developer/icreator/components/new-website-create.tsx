/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Loader, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import { uploadToSupabase } from '@/utils/upload-to-supabase'
import Image from 'next/image'

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    releaseNotes: z.string(),
    downloadLink: z.string().url(),
})

const NewWebsiteCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [iconFile, setIconFile] = useState<File | null>(null)
    const [screenshotFiles, setScreenshotFiles] = useState<File[]>([])
    const createApp = api.app.create.useMutation({
        onSuccess: () => {
            toast.success("App submitted successfully")
        }
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "New App",
            description: "",
            downloadLink: "",
            releaseNotes: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!iconFile || !screenshotFiles) {
            toast.error("image files could not be found")
            return
        }

        try {
            setIsSubmitting(true)
            toast.promise(
                (async () => {
                    const logo = await uploadToSupabase(iconFile)
                    const screenshots: string[] = [];
                    const { description, downloadLink, releaseNotes, title } = values

                    for (const screenshotFile of screenshotFiles) {
                        const screenshot = await uploadToSupabase(screenshotFile)
                        screenshots.push(screenshot)
                    }

                    await createApp.mutateAsync({
                        description,
                        screenshots,
                        logo,
                        releaseNotes,
                        title,
                        downloadLink
                    })
                })(),
                {
                    loading: "Submitting your app...",
                    description: "It might take some time",
                    success: "App submitted successfully! ",
                    error: "Failed to submit the app. Please try again."
                }
            )

        } catch {
            toast.error("Something went wrong while submitting your app.", {
                description: "Try again later"
            })
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Plus />
                        New Website
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </DialogTrigger>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogContent className='max-w-7xl md:w-full w-[90%] max-h-[90vh] overflow-y-auto no-scrollbar'>
                        <DialogHeader className='gap-0.5'>
                            <DialogTitle>Create New App</DialogTitle>
                            <DialogDescription>Fill in the details properly for creating a new app</DialogDescription>
                            <Link href='/' className='text-xs text-blue-400 hover:underline inline-flex items-center'>Read developer documention for app submitting <ArrowUpRight className='size-3' /></Link>
                        </DialogHeader>
                        <div className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='icon'>Icon</Label>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) setIconFile(file)
                                    }}
                                    placeholder='Enter a title for your app'
                                    id='icon' />
                                {iconFile && (<Image src={URL.createObjectURL(iconFile)} alt='icon' width={200} height={400} />)}
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='title'>Title</Label>
                                <FormField
                                    name='title'
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input {...field} id='title' placeholder='Enter a title for your app' />
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='downloadLink'>
                                    Download Link
                                </Label>
                                <FormField
                                    name='downloadLink'
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input {...field} id='downloadLink' placeholder='https://dl.dropboxuser.com/' />
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='description'>
                                    Description
                                </Label>
                                <FormField
                                    name='description'
                                    control={form.control}
                                    render={({ field }) => (
                                        <Textarea {...field} id='description' placeholder='Enter a description for your app' />
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='releaseNotes'>
                                    Release Notes
                                </Label>
                                <FormField
                                    name='releaseNotes'
                                    control={form.control}
                                    render={({ field }) => (
                                        <Textarea {...field} id='releaseNotes' placeholder='Enter a release note for the version' />
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='releaseNotes'>
                                    Screenshots
                                </Label>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) setScreenshotFiles(prev => [...prev, file])
                                    }}
                                />
                                <div className='flex items-center gap-2 overflow-x-auto'>
                                    {
                                        screenshotFiles?.map((screenshot, index) => {
                                            const src = URL.createObjectURL(screenshot)
                                            return (
                                                <Dialog key={index} >
                                                    <DialogTrigger asChild>
                                                        <Image src={src} alt='screenshot' className='rounded-md' width={200} height={400} />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-7xl md:w-full w-[90%] border-0 bg-transparent p-0">
                                                        <div className="relative w-full overflow-clip rounded-md bg-transparent">
                                                            <Image src={src} alt={'image'} width={200} height={300} className="h-full w-full object-contain" />
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )
                                        })
                                    }
                                </div>

                            </div>

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'secondary'}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <DialogClose>
                                <Button disabled={!form.formState.isValid} type='submit' onClick={form.handleSubmit(onSubmit)}>
                                    {isSubmitting || createApp.isPending ? <Loader className='animate-spin' /> : "Submit"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>

            </Form>

        </Dialog>

    )
}

export default NewWebsiteCreate