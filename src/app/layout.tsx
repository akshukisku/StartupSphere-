import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";

const Helvatica = localFont({
  src: [
    {
      path: "../fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvatica",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startup-sphere-xi.vercel.app"),

  title: {
    default: "StartupSphere+ | AI Startup Incubation & Investment Platform",
    template: "%s | StartupSphere+",
  },

  description:
    "StartupSphere+ is an AI-powered startup incubation and investment platform connecting founders, investors, mentors, and incubators. Build, showcase, fund, and grow your startup with AI-powered insights.",

  applicationName: "StartupSphere+",

  keywords: [
    "StartupSphere",
    "StartupSphere+",
    "AI Startup Platform",
    "Startup Incubator",
    "Startup Investment",
    "Startup Funding",
    "Angel Investors",
    "Startup Mentorship",
    "Pitch Deck",
    "Founder Platform",
    "Investment Platform",
    "Business Incubation",
    "AI Startup Assistant",
    "Startup Ecosystem",
    "Entrepreneurship",
  ],

  authors: [
    {
      name: "StartupSphere Team",
    },
  ],

  creator: "StartupSphere Team",

  publisher: "StartupSphere+",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://startup-sphere-xi.vercel.app",
    siteName: "StartupSphere+",
    title: "StartupSphere+ | AI Startup Incubation & Investment Platform",
    description:
      "Discover startups, connect with investors, build pitch decks, and accelerate your startup journey with AI.",

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "StartupSphere+",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "StartupSphere+",
    description:
      "AI-powered startup incubation and investment platform.",
    images: ["/images/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log("Root Mounted")
  return (
    <html lang="en" className={`${Helvatica.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}