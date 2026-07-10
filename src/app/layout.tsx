import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import Providers from "./providers";
import { TooltipProvider } from "@/components/ui/tooltip";

const Helvetica = localFont({
  src: [
    {
      path: "../fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startupsphereplus.com"),

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
    url: "https://startupsphereplus.com",
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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${Helvetica.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background font-sans">
        <Providers>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}