import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
    title: "Imago One - Imago (IN)",
    description: "Purchase all imago subscription for your needs here."
}

export default function ImagoOneLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}