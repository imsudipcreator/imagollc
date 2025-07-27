import type React from "react";
import { Tabs } from "@/components/ui/tabs";
import Navbar from "../../components/navbar";

export default function ICreatorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-svh w-full flex overflow-clip">
            {children}
        </div>

    )
}