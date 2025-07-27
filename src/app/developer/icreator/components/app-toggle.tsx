"use client"

import { useId } from "react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AppToggle() {
    return (
        <TabsList>
            <TabsTrigger value="chat" className="w-28">Chat</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
    )
}