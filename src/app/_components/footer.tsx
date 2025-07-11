// import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";

import ImagoIcon from "@/components/icons/imago-icon";
import { bottomLinks, navigationSections } from "@/constants/routes";
import Link from "next/link";

export const Footer = () => {
    return (
        <section className="py-32  max-w-[80rem] w-full px-6">
            <div className="container">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 ">
                        <div className="col-span-2 mb-8 lg:mb-0 h-full row-span-3">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Link href="/" className="flex items-center gap-2">
                                    <ImagoIcon size={28} />
                                    <span className="text-4xl font-roobert font-semibold">Imago llc</span>
                                </Link>
                            </div>
                            <p className="mt-4 font-bold">Crafting the future of tech</p>
                        </div>
                        {navigationSections.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="">
                                <h3 className="mb-4 font-bold">{section.label}</h3>
                                <ul className="text-muted-foreground space-y-4">
                                    {section.routes.map((route, routeIdx) => (
                                        <li
                                            key={routeIdx}
                                            className="hover:text-primary font-medium"
                                        >
                                            <Link href={route.href} className="hover:underline underline-offset-3">
                                                {route.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
                        <p>{'© 2025 Imagollc. All rights reserved'}</p>
                        <ul className="flex gap-4">
                            {bottomLinks.map((link, linkIdx) => (
                                <li key={linkIdx} className="hover:text-primary underline">
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

