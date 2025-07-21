import {
  BoltIcon,
  BookOpenIcon,
  House,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  User,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const router = useRouter()
  const { user } = useUser()
  const [shortName, setShortName] = useState("NN")

  const shortenedUsername = (firstName: string, lastName: string): string => {
    const firstLetter = firstName.split('')[0]
    const lastLetter = lastName.split('')[0]

    return `${firstLetter}${lastLetter}`
  }

  useEffect(() => {
    const firstName = user?.firstName
    const lastName = user?.lastName
    if (user && firstName && lastName) {
      const result = shortenedUsername(firstName, lastName)
      setShortName(result)
    } else {
      setShortName("NN")
      toast.error("Something went wrong", {
        description: "For some reason, your name could not be found"
      })
    }
  }, [user])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'sm'} className="h-auto p-0 hover:bg-transparent rounded-full flex items-center overflow-clip size-6  justify-center">
          <Avatar>
            <AvatarImage className="object-cover" src={user?.hasImage ? user?.imageUrl : undefined} alt="Profile image" />
            <AvatarFallback className="text-foreground">{shortName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.fullName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/")}>
            <House size={16} className="opacity-60" aria-hidden="true" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Gallery</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/account')}>
            <User size={16} className="opacity-60" aria-hidden="true" />
            <span>Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem >
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span className="text-red-400">Logout</span>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
