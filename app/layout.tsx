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
  title: "ITC Blog - Developer Community",
  description: "Dasturchilar uchun bilim almashish platformasi",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico", // favicon yo‘li (public papkadan)
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
