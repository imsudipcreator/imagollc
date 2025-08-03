import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Imago - Policy",
    description: "The policy for all imago services"
};


export default function PolicyLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full flex flex-col items-center justify-center">
            {children}
        </main>
    )
}