import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import type React from "react";
import AppSidebar from "./components/app-sidebar";
import Tabbar from "./components/tabbar";
import { CommunityProvider } from "./contexts/community-context";


export const metadata: Metadata = {
    title: "Community - Intelligence",
    description: "Explore all new IMI created masterpieces from all around the world."
}

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <CommunityProvider>
            <SidebarProvider>
                <div className="flex w-full h-svh">
                    <AppSidebar />
                    <main className="flex-1 flex flex-col min-h-0 overflow-y-auto relative">
                        {children}
                        <Tabbar />
                    </main>
                </div>
            </SidebarProvider>
        </CommunityProvider>


    )
}


export default CommunityLayout