import { HydrateClient } from "@/trpc/server";
import HeroSection from "./_components/hero";
import { Features } from "./_components/features";
import { MainFeatures } from "./_components/main-features";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="w-full flex flex-col items-center justify-center">
        <HeroSection/>
        <Features/>
        <MainFeatures/>
      </main>
    </HydrateClient>
  );
}
