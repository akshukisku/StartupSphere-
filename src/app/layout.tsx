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
  title: "StartupSphere+",
  description: "AI Powered Startup Incubation & Investment Platform",
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