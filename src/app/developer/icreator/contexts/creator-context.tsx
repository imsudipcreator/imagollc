'use client'

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface CreatorContextType {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  handleCreateNewWebsite: () => void
  isPending: boolean
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatorContext = createContext<CreatorContextType | null>(null)


export const defaultCode = `
<!DOCTYPE html>
<html>
  <head>
    <title>My app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="flex justify-center items-center h-screen overflow-hidden bg-white font-sans text-center px-6">
    <div class="w-full">
      <span class="text-xs rounded-full mb-2 inline-block px-2 py-1 border border-amber-500/15 bg-amber-500/15 text-amber-500">🔥 New version dropped!</span>
      <h1 class="text-4xl lg:text-6xl font-bold font-sans">
        <span class="text-2xl lg:text-4xl text-gray-400 block font-medium">I'm ready to work,</span>
        Ask me anything.
      </h1>
    </div>
      <img src="https://enzostvs-deepsite.hf.space/arrow.svg" class="absolute bottom-8 left-0 w-[100px] transform rotate-[30deg]" />
    <script></script>
  </body>
</html>
`

export const CreatorProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [code, setCode] = useState<string>(defaultCode ?? "")
  const [isPending, setIsPending] = useState(true)

  const createNewWebsite = api.website.createProject.useMutation({
    onSuccess: (data) => {
      toast.success("Project created successfully", {
        description: "Edit with autocomplete or ask intelligence"
      })
      router.push(`/developer/icreator/projects/${data.id}`)
    },

    onError: () => {
      toast.error("Could not create your project!", {
        description: "Try again later or report this issue if persists"
      })
    }
  })
  const handleCreateNewWebsite = () => {
    void createNewWebsite.mutateAsync()
  }
  return (
    <CreatorContext.Provider value={{ code, setCode, handleCreateNewWebsite, isPending, setIsPending }}>
      {children}
    </CreatorContext.Provider>
  )
}


export const useCreator = () => {
  const context = useContext(CreatorContext)

  if (!context) {
    throw new Error("useCreator must be used within CreatorProvider")
  }

  return context
}