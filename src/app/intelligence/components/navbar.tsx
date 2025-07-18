'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { models, personas } from '@/constants/models'
import { useIntelligence } from '@/contexts/intelligence-context'
import { useIsMobile } from '@/hooks/use-mobile'
import type { SettingsData } from '@/types/intel-types'
import { PanelLeft, Settings, Shapes } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const Navbar = () => {
    const isMobile = useIsMobile()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { saveSettingsToLocal, resetToDefault } = useIntelligence()

    // useEffect(()=>{

    // },[pathname])
    return (
        <nav className='flex items-center justify-between h-12 w-full px-3 py-2'>
            <div className='flex items-center justify-start gap-3 h-full'>
                <SidebarTrigger>
                    <Button variant={'secondary'} size={'sm'}>
                        <PanelLeft />
                    </Button>
                </SidebarTrigger>
                <Separator orientation='vertical' className='h-5!' />
                <p className='text-accent-foreground'>{pathname.split('/')[1]}</p>
            </div>

            <div className='flex items-center justify-center flex-row-reverse'>
                {
                    isMobile ? (
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <Button variant={'ghost'} size={'icon'}>
                                    <Settings />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className='max-w-sm p-4 w-full mx-auto'>
                                    <DrawerHeader>
                                        <DrawerTitle className='flex items-center gap-1 self-center'>
                                            <Shapes className='size-4' />
                                            My preferences
                                        </DrawerTitle>
                                        <DrawerDescription>
                                            Edit this accordingly for better responses
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <SettingsSection />
                                </div>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant={'secondary'} onClick={resetToDefault}>
                                            Reset to default
                                        </Button>
                                    </DrawerClose>
                                    <DrawerClose asChild>
                                        <Button variant={'default'} onClick={saveSettingsToLocal}>
                                            Save
                                        </Button>
                                    </DrawerClose>

                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant={'ghost'} size={'icon'}>
                                    <Settings />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='flex items-center gap-1'>
                                        <Shapes className='size-5' />
                                        My preferences
                                    </DialogTitle>
                                    <DialogDescription>
                                        Edit this accordingly for better responses
                                    </DialogDescription>
                                </DialogHeader>
                                <SettingsSection />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant={'secondary'} onClick={resetToDefault}>
                                            Reset to default
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant={'default'} onClick={saveSettingsToLocal}>
                                            Save
                                        </Button>
                                    </DialogClose>

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )
                }


            </div>
        </nav>
    )
}

export default Navbar

const SettingsSection = () => {
    const { setSelectedModel, selectedModel, selectedPersona, setSelectedPersona, customPrompt, setCustomPrompt } = useIntelligence()

    return (
        <section className='flex flex-col w-full pt-5 gap-6'>
            <div className='grid gap-3'>
                <Label>Models</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                        <SelectValue>
                            {models.find((m) => m.value === selectedModel)?.label ?? "Select a model"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Models</SelectLabel>
                            {
                                models.map((model) => (
                                    <SelectItem value={model.value} key={model.value}>
                                        <div className='flex flex-col'>
                                            <span>{model.label}</span>
                                            <span className='text-muted-foreground text-xs'>{model.description}</span>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='grid gap-3'>
                <Label>Personas</Label>
                <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                    <SelectTrigger>
                        <SelectValue>
                            {personas.find((p) => p.value === selectedPersona)?.label ?? "Select a persona"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Personas</SelectLabel>
                            {
                                personas.map((persona) => (
                                    <SelectItem value={persona.value} key={persona.value}>
                                        <persona.icon />
                                        <div className='flex flex-col'>
                                            <span>{persona.label}</span>
                                            <span className='text-muted-foreground text-xs truncate'>{persona.description}</span>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>


            <div className='grid gap-3'>
                <Label>Custom Prompt</Label>
                <TextareaAutosize
                    placeholder='Add your custom prompt'
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    minRows={5}
                    maxRows={9}
                    className='resize-none border border-border rounded-lg p-3'
                />
            </div>


            {/* <div className='w-full flex items-center justify-end gap-3.5'>
                
            </div> */}
        </section>
    )
}