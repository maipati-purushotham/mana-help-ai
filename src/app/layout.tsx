import type { Metadata, Viewport } from "next";
import { Noto_Sans_Telugu, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-telugu",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mana Help AI — Understand documents in simple Telugu",
    template: "%s | Mana Help AI",
  },
  description:
    "Voice-first AI assistant that explains government letters, bills, and forms in simple Telugu. Free for rural India.",
  keywords: [
    "Telugu AI",
    "document understanding",
    "voice assistant",
    "rural India",
    "Mana Help AI",
  ],
  
  icons: {
    icon: "/Website-Logo.png",
    shortcut: "/Website-Logo.png",
    apple: "/Website-Logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="te" className={`${telugu.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-amber-50">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}