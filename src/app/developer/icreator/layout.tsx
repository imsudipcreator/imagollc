import type React from "react";
import { CreatorProvider } from "./contexts/creator-context";

export default function ICreatorLayout({ children }: { children: React.ReactNode }) {
    return (
        <CreatorProvider>
            <div className="min-h-svh w-full flex flex-col">
                {children}
            </div>
        </CreatorProvider>


    )
}