import { navigationSections } from "@/constants/routes";
import Link from "next/link"

export default function SitemapPage() {
    return (
        <main className="lg:max-w-[61rem] w-[88%] flex flex-col items-center justify-center mx-auto py-12 space-y-8 ">
            <h1 className="text-2xl font-semibold self-start w-full border-b border-border pb-3.5">Imago Sitemap</h1>

            <div className="w-full grid grid-cols-2 space-y-7">
                {navigationSections.map(section => (
                    <section className="" key={section.label}>
                        <h2 className="text-xl font-semibold mb-4">{section.label}</h2>
                        <ul className="grid grid-cols-1 gap-2 text-theme">
                            {section.routes.map(link => (
                                <li className="hover:underline" key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

        </main>
    );
}