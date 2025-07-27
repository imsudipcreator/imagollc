"use client"

import { useId } from "react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, MessageCircleCode } from "lucide-react"

export default function AppToggle() {
    return (
        <TabsList>
            <TabsTrigger value="chat" className="md:w-28 w-24">
                <MessageCircleCode/>
                <span className="not-md:hidden">Chat</span> 
            </TabsTrigger>
            <TabsTrigger value="preview">
                <Eye/>
                <span className="not-md:hidden">Preview</span> 
            </TabsTrigger>
        </TabsList>
    )
}