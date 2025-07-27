import React from 'react'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bell, ChevronsUpDown, CircleUser, Sparkles } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'
import { Button } from './ui/button'

const UserFooter = () => {
  const isMobile = useIsMobile()
  const { isSignedIn, user } = useUser()
  return (
    <SidebarFooter>
      <SidebarMenu>
        {
          isSignedIn ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size={'lg'}
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  >
                    <Avatar>
                      <AvatarImage src={user?.hasImage ? user?.imageUrl : undefined} />
                      <AvatarFallback>KK</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-medium'>{user?.emailAddresses[0]?.emailAddress}</span>
                      <span className='truncate text-xs'>{`${user?.firstName} ${user.lastName}`}</span>
                    </div>
                    <ChevronsUpDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                  side={isMobile ? 'bottom' : 'right'}
                  align='end'
                  sideOffset={4}
                >
                  <DropdownMenuLabel>
                    <div className='flex items-center gap-2  px-1 py-1.5 text-left text-sm'>
                      <Avatar>
                        <AvatarImage src={user?.hasImage ? user?.imageUrl : undefined} />
                        <AvatarFallback>KK</AvatarFallback>
                      </Avatar>
                      <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-medium'>{user?.emailAddresses[0]?.emailAddress}</span>
                        <span className='truncate font-normal text-xs'>{`${user?.firstName} ${user.lastName}`}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade your plan
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={'/account'}>
                      <DropdownMenuItem>
                        <CircleUser />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/account'}>
                      <DropdownMenuItem>
                        <Bell />
                        Notifications
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant={'default'}>
                    <Link href={'/sign-in'}>
                      Sign in
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant={'outline'}>
                    <Link href={'/sign-up'}>
                      Sign up
                    </Link>
                  </Button>

                </SidebarMenuButton>
              </SidebarMenuItem>
            </>

          )
        }

      </SidebarMenu>
    </SidebarFooter>
  )
}

export default UserFooter