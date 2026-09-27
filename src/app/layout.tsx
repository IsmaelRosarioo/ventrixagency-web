import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#06080d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ventrixagency.com"),
  title: "VENTRIX: FRONTIER — Official Minecraft Modpack & Cloud Server",
  description:
    "An Apple-grade flagship Minecraft survival chronicle. 514 curated mods, 6 cosmic planetary dimensions, kinetic brass machinery, ancient spirit arcana, and persistent 20.0 TPS cloud survival. Connect at mc.ventrixagency.com.",
  keywords: [
    "Ventrix",
    "Ventrix Frontier",
    "Minecraft Server",
    "NeoForge 1.21.1",
    "Ad Astra",
    "Create Mod",
    "Malum",
    "Foxomy Cloud",
    "Modpack",
  ],
  authors: [{ name: "Ventrix Agency", url: "https://ventrixagency.com" }],
  openGraph: {
    title: "VENTRIX: FRONTIER — The Frontier of Modded Survival",
    description:
      "514 Curated Mods • 6 Cosmic Dimensions • 20.0 TPS Dallas Cloud. Join the adventure at mc.ventrixagency.com.",
    url: "https://ventrixagency.com",
    siteName: "Ventrix Agency",
    images: [
      {
        url: "/branding/banner.png",
        width: 1200,
        height: 630,
        alt: "Ventrix Frontier Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VENTRIX: FRONTIER — The Frontier of Modded Survival",
    description:
      "514 Curated Mods • 6 Cosmic Dimensions • 20.0 TPS Dallas Cloud. Join at mc.ventrixagency.com.",
    images: ["/branding/banner.png"],
  },
  icons: {
    icon: "/branding/server-icon.png",
    apple: "/branding/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#06080d] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
