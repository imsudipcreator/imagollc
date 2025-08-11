import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import NavbarWrapper from "./_components/navbar-wrapper";
import FooterWrapper from "./_components/footer-wrapper";
import { Toaster } from "@/components/ui/sonner";
import 'framework7-icons';
import { NavbarProvider } from "@/contexts/home/navbar-context";

export const metadata: Metadata = {
  title: "Imago – Your Hub for Apps, AI & Web Development",
  description: "Imago is the central platform for all your apps and websites, featuring Imago Intelligence to enhance your digital experience. Access your tools, explore new projects, and tap into powerful AI features in one place.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    title: "Imago llc",
    description: "Welcome to imago llc. Here we craft intelligent digital solutions — Apps, Websites & AI That Work for You.",
    url: "https://imagollc.vercel.app",
    siteName: "Imago llc",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Imago llc"
      }
    ],
    locale: "en-US",
    type: "website"
  },
  authors: [
    {
      name: "Sudip Mahata",
      url: "https://portofolio-eight-orcin.vercel.app/"
    },
    {
      name: "Imagollc Team",
      url: "https://imagollc.vercel.app/"
    }
  ],
  keywords: [
    "Imago llc",
    "Imago hub",
    "Imago Intelligence",
    "Imago AI",
    "Imago Creator",
    "ICreator",
    "Imago Editor",
    "IEditor",
    "AI app builder",
    "AI web development",
    "custom web apps",
    "business automation AI",
    "AI-powered tools",
    "next-gen apps",
    "SaaS platform",
    "cloud app solutions",
    "AI development services",
    "web design and AI",
    "intelligent software solutions",
    "app and website hub",
    "AI for small business",
    "digital transformation tools",
    "AI content creator",
    "modern web platform",
    "AI startup tools"
  ],
  creator: "Sudip Mahata",
  publisher: "Imagollc"
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

/**
 * Root layout component that sets up global providers, theming, and structure for the application.
 *
 * Wraps all pages with authentication, tRPC, and theme providers, and includes the navigation bar, footer, and global toast notifications.
 *
 * @param children - The page content to render within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <NavbarProvider>
        <html lang="en" className={`${geist.variable}`}>
          <body>
            <TRPCReactProvider>
              <div className="w-full min-h-svh flex flex-col items-center justify-start">
                <NavbarWrapper />
                {children}
                <Toaster richColors position="top-center" />
                <FooterWrapper />
              </div>
            </TRPCReactProvider>
          </body>
        </html>
      </NavbarProvider>
    </ClerkProvider>

  );
}
