'use client'

import moment from 'moment';
import { api } from '@/trpc/react'
import React, { useEffect, useId, useState } from 'react'
import ChatPage from './components/chat'
import PreviewPage from './components/preview-page'
import { useCreator } from './contexts/creator-context'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { TabsContent } from '@/components/ui/tabs'
import { Globe, LayoutGridIcon, Loader, PencilLine, PlusIcon, SearchIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './components/app-sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import InfoMenu from '@/components/originui/info-menu'
import NotificationMenu from '@/components/originui/notification-menu'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

const ICreatorPage = () => {
  const { } = useCreator()
  const { user } = useUser()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isReady, setIsReady] = useState(false)
  const { data, isLoading, isFetching } = api.website.findMany.useQuery()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100) // simulate async if needed or wait for layout

    return () => clearTimeout(timer)
  }, [])

  const showLoading = !isReady || isLoading

  if (showLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <Loader className='animate-spin' />
      </div>
    )

  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='w-full min-h-0 flex flex-col'>
        <Navbar />
        <div className='w-full px-4 md:px-6'>
          <div className='w-full py-8'>
            <h1 className='text-3xl font-semibold'>{`${user?.firstName}'s`} Projects</h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
              data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <Card className='w-full min-h-44 relative cursor-pointer hover:shadow-lg transition-all duration-200' onClick={() => router.push(`/developer/icreator/projects/${item.id}`)}>
                      <CardHeader>
                        <CardTitle>
                          {item.slug}
                        </CardTitle>
                        <CardDescription>
                          last updated: {moment(item.updatedAt).fromNow()}
                        </CardDescription>
                      </CardHeader>
                      <Badge className={'absolute top-4 right-5'}>{item.public ? "Public" : "Private"}</Badge>
                      <CardContent>
                        <h1>
                          {item.prompt.slice(0, 60) + "..."}
                        </h1>
                      </CardContent>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <PencilLine />
                      Rename
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Globe />
                      Public
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>

              ))
            }
          </div>
        </div>

      </div>
    </SidebarProvider>
  )
}

export default ICreatorPage


const Navbar = () => {
  const id = useId()
  const { handleCreateNewWebsite } = useCreator()
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="relative flex-1">
          <Input
            id={`input-${id}`}
            className="peer h-8 w-full max-w-xs ps-8 pe-2"
            placeholder="Search..."
            type="search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Layout button */}
            <SidebarTrigger />
            {/* <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground size-8 rounded-full shadow-none"
              aria-label="Open layout menu"
            >
              <LayoutGridIcon size={16} aria-hidden="true" />
            </Button> */}
            {/* Info menu */}
            <InfoMenu />
            {/* Notification */}
            <NotificationMenu />
            {/* Settings */}
            {/* <SettingsMenu /> */}
          </div>
          {/* Add button */}
          <Button
            className="size-8 rounded-full"
            size="icon"
            aria-label="Add new item"
            onClick={handleCreateNewWebsite}
          >
            <PlusIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>

  )
}