import type React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { NetworkStatus } from "@/components/ui/network-status";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITC Blog - Dasturchilar hamjamiyati",
  description: "ITC Blog — bu dasturchilar va IT mutaxassislari uchun bilim almashish, maqolalar yozish va tajriba ulashish platformasi.",
  keywords: ["dasturlash", "blog", "dasturchilar", "IT", "maqola", "frontend", "backend", "itc-blog.uz"],
  authors: [{ name: "ITC Team", url: "https://itc-blog.uz" }],
  creator: "ITC Blog",
  publisher: "ITC Blog",
  metadataBase: new URL("https://itc-blog.uz"),
  generator: "v0.dev",

  // Faviconlar
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // Open Graph (Facebook, Telegram va boshqalar uchun)
  openGraph: {
    type: "website",
    url: "https://itc-blog.uz",
    title: "ITC Blog - Dasturchilar hamjamiyati",
    description: "Dasturchilar uchun bilim almashish va maqola yozish platformasi.",
    siteName: "ITC Blog",
    images: [
      {
        url: "/itc-blog.png",
        width: 1200,
        height: 630,
        alt: "ITC Blog - Dasturchilar hamjamiyati",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@itc_blog", // Twitter akkauntingiz bo‘lsa qo‘shing
    title: "ITC Blog - Dasturchilar hamjamiyati",
    description: "Bilim almashish va maqola yozish uchun zamonaviy platforma.",
    images: ["/itc-blog.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={jetbrainsMono.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <NetworkStatus />
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
