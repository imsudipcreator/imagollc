"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DisplayCards from "@/components/prismui/display-cards";
import { LogoCarousel } from "@/components/prismui/logo-carousel";
import Link from "next/link";
import { AiBeams } from "./ai-beams";
import Image from "next/image";
import TypewriterTitle from "@/components/kokonutui/typewriter";

interface FeatureCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

function FeatureCard({ title, description, children }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative rounded-xl border bg-background"
        >
            <div className="p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
            <div className="p-4 pt-0">{children}</div>
        </motion.div>
    );
}


export function MainFeatures() {
    return (
        <section className="container relative py-20 max-w-[80rem] px-12 md:px-8 lg:px-6 xl:px-0 w-full flex flex-col items-center">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <Link href={"/store"}>
                        <Button variant="outline" className="rounded-full mb-4">
                            Browse Products
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                        The tools you need. <span className="text-theme">The team you trust.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                        From pre-built apps and AI tools to fully custom software — Imago helps
                        individuals and teams launch faster, smarter, and with real impact.
                    </p>
                </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <FeatureCard
                    title="Pre-Built Products"
                    description="Access powerful apps, websites, and tools — all crafted for speed, UX, and reliability. Just plug, play, and grow."
                >
                    <div className="flex items-center justify-center min-h-[300px] rounded-lg bg-muted/50 p-8 overflow-hidden">
                        <div className="scale-[0.80] origin-center w-[12rem] md:w-full -mt-16">
                            <DisplayCards />
                        </div>
                    </div>
                </FeatureCard>

                <FeatureCard
                    title="Custom App Development"
                    description="Need something tailored? We build apps, dashboards, and SaaS platforms for businesses and creators — fast, scalable, and beautiful."
                >
                    <div className="flex items-center justify-center min-h-[300px] rounded-lg bg-muted/50 p-8">
                        <Image src={'/assets/home/goofy-cards.webp'} alt="Goofy-cards" width={400} height={400} className=""/>
                    </div>
                </FeatureCard>

                <FeatureCard
                    title="AI Tool Integration"
                    description="We don’t just build — we integrate AI. From chatbots to workflows, we help you implement smart solutions using top AI models."
                >
                    <div className="flex items-center justify-center min-h-[300px] rounded-lg bg-muted/50">
                        <AiBeams/>
                    </div>
                </FeatureCard>

                <FeatureCard
                    title="Custom Development & Integration"
                    description="Need a product built for your brand? We design and develop fully customized websites, apps, and AI-powered tools using modern, scalable tech. From frontend design to backend infrastructure — we handle everything with precision and speed."
                >
                    <div className="flex items-center justify-center min-h-[300px] rounded-lg bg-muted/50 p-8">
                        <LogoCarousel columns={2} />
                    </div>
                </FeatureCard>


                <FeatureCard
                    title="Client Dashboards & Forms"
                    description="From lead-gen forms to full-featured dashboards, we build smooth, secure, and fast frontends for every project size."
                >
                    <div className=" min-h-[300px] rounded-lg bg-muted/50 p-8 flex items-center justify-center overflow-clip">
                       <Image src={'/assets/home/mail-dashboard.webp'} alt="dashboard" width={900} height={700} className=""/>
                    </div>
                </FeatureCard>

                <FeatureCard
                    title="Ongoing Support & Updates"
                    description="We don’t disappear after delivery. Get regular updates, fixes, improvements — and even feature expansions on demand."
                >
                    <div className=" min-h-[300px] rounded-lg bg-muted/50 p-8 flex items-center justify-center ">
                       <TypewriterTitle/>
                    </div>
                </FeatureCard>
            </div>
        </section>

    );
}