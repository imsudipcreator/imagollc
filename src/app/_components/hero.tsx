"use client";

import { Card } from "@/components/ui/card";
import { AppleHelloEnglishEffect } from "@/components/21st-dev-ui/hello-effect";

export default function HeroSection() {
    return (
        <div className="flex flex-col gap-4 w-full items-center justify-center">
            <Card className="p-6 rounded-none border-none flex items-center justify-center w-full min-h-svh max-w-[80rem]">
                <AppleHelloEnglishEffect />
            </Card>
        </div>
    );
}