import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, Home, RefreshCcw, SparklesIcon, Upload, UploadIcon, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppToggle from "./app-toggle"
import { Button } from "@/components/ui/button"
import { useCreator } from "../contexts/creator-context"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import { toast } from "sonner"

interface NavbarProps {
  slug: string,
  projectId: string
}

export default function Navbar({ slug, projectId }: NavbarProps) {
  const { user, isLoaded } = useUser()
  const { code } = useCreator()
  const router = useRouter()
  const syncProject = api.website.updateOne.useMutation({
    onSuccess: () => {
      toast.success("Project Synced successfully")
    },
    onError: () => {
      toast.error("Project could not be synced", {
        description: "Try again later"
      })
    },
  })

  const exportProject = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <header className="border-b px-4 md:px-6 w-full min-h-12">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2 ">
          {/* <TeamSwitcher teams={teams} defaultTeam={teams[0] ?? "Acme Inc."} /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {
                isLoaded ? (
                  <Button variant={'ghost'}>
                    <Avatar>
                      <AvatarImage src={user?.imageUrl} alt="image" />
                      <AvatarFallback>{`${user?.firstName?.[0] ?? "N"}${user?.lastName?.[0] ?? "N"}`}</AvatarFallback>
                    </Avatar>
                    {slug} <ChevronsUpDown />
                  </Button>
                ) : (
                  <Skeleton className="h-4 w-16" />
                )
              }

            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/developer/icreator')}>
                  <Home /> Go to dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => void syncProject.mutateAsync({ code, projectId })}>
                  <RefreshCcw /> Sync Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/account')}>
                  <User /> Go to Account
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup className="md:hidden">
                <DropdownMenuItem onClick={exportProject}>
                  <Upload /> Export Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SparklesIcon /> Upgrade to Premium
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Middle area */}
        <AppToggle />
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2 not-md:hidden">
          <Button
            size="sm"
            variant="ghost"
            className="text-sm max-sm:aspect-square max-sm:p-0"
            onClick={exportProject}
          >
            <UploadIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Export</span>
          </Button>
          <Button size="sm" className="text-sm max-sm:aspect-square max-sm:p-0">
            <SparklesIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Upgrade</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
