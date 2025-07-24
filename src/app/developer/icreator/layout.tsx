import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import AppSidebar from "./components/app-sidebar";
import Navbar from "./components/navbar";

export default function ICreatorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-svh w-full flex">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 flex flex-col">
                    <Navbar />
                    {children}
                </main>
            </SidebarProvider>
        </div>

    )
}