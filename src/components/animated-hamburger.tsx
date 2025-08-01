// components/ui/AnimatedHamburger.tsx
"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface AnimatedHamburgerProps {
    isOpen: string | null;
    toggle: () => void;
    height?: number; // in px
    width?: number;
    extendClassaname?: string
}

export default function AnimatedHamburger({
    isOpen,
    toggle,
    height = 8,
    width = 16
}: AnimatedHamburgerProps) {
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const duration = 0.2;
        // Kill old animation if any
        if (animationRef.current) {
            animationRef.current.kill();
            animationRef.current = null;
        }


        const tl = gsap.timeline({ defaults: { duration, ease: "power2.out" } });
        animationRef.current = tl

        if (isOpen !== null) {
            tl.to(line1Ref.current, { top: "50%" }, 0)
                .to(line2Ref.current, { top: "50%" }, 0)
                .to(line1Ref.current, { rotate: 45 }, "+=0.05")
                .to(line2Ref.current, { rotate: -45 }, "-=0.2");
        } else {
            tl.to(line1Ref.current, { rotate: 0 }, 0)
                .to(line2Ref.current, { rotate: 0 }, 0)
                .to(line1Ref.current, { top: "0%" }, "+=0.05")
                .to(line2Ref.current, { top: "100%" }, "-=0.2");
        }

        return () => {
            tl.kill()
            animationRef.current = null
        }
    }, [isOpen]);

    return (
        <div
            onClick={toggle}
            className={cn("relative flex items-center justify-center cursor-pointer")}
            style={{ width, height }}
        >
            <div
                ref={line1Ref}
                className="absolute rounded-full bg-foreground"
                style={{
                    width,
                    height: 1.5,
                    // backgroundColor: color,
                    top: "0%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    transformOrigin: "center",
                }}
            />
            <div
                ref={line2Ref}
                className="absolute rounded-full bg-foreground"
                style={{
                    width,
                    height: 1.5,
                    // backgroundColor: color,
                    top: "100%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    transformOrigin: "center",
                }}
            />
        </div>
    );
}