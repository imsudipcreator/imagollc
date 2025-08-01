import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useStaggerFadeIn(
  trigger: boolean,
  options?: {
    delay?: number;
    stagger?: number;
    y?: number;
    duration?: number;
  },
) {
  const refs = useRef<HTMLElement[]>([]);

  const getRef = (index: number) => (el: HTMLElement | null) => {
    if (el) refs.current[index] = el;
  };

  useGSAP(() => {
    if (!trigger) return;

    gsap.fromTo(
      refs.current,
      {
        opacity: 0,
        y: options?.y ?? 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: options?.stagger ?? 0.1,
        delay: options?.delay ?? 0,
        duration: options?.duration ?? 0.3,
        ease: "power2.out",
      },
    );
  }, [trigger]);

  return getRef;
}
