"use client";

import Hero from "@/components/prismui/hero";
import { Card } from "@/components/ui/card";
// import { ComponentPreview } from "@/components/sections/component-preview";
import ImagoIcon from "@/components/icons/imago-icon";
import { BookIcon, ComponentIcon } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="grid gap-4">
            {/* Example 1: With Preview */}
            <Card className="p-6 rounded-none border-none">
                {/* <h3 className="mb-4 text-lg font-medium">With Preview</h3> */}
                <Hero
                    pill={{
                        text: "New! Imago Platform",
                        href: "/about",
                        icon: <ImagoIcon className="h-4 w-4" />,
                    }}
                    content={{
                        title: "Reimagine how you",
                        titleHighlight: "build, share & scale digital tools",
                        description:
                            "From blazing-fast apps to intelligent AI features — Imago is your creative launchpad. Discover tools built for performance, beauty, and real-world impact.",
                        primaryAction: {
                            href: "/store",
                            text: "Explore the Store",
                            icon: <ComponentIcon className="h-4 w-4" />,
                        },
                        secondaryAction: {
                            href: "/developer/docs",
                            text: "Read Dev Docs",
                            icon: <BookIcon className="h-4 w-4" />,
                        },
                    }}
                    preview={<Image src={'/assets/home/apps-float.webp'} alt="preview-apps" width={400} height={300}/>}
                />

            </Card>
        </div>
    );
}