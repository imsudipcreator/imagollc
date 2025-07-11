import { HydrateClient } from "@/trpc/server";
import HeroSection from "./_components/hero";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="w-full">
        <HeroSection/>
      </main>
    </HydrateClient>
  );
}
