import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Store | Imago llc",
    description: "Imago Store"
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}