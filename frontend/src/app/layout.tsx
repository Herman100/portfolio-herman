import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import Head from "next/head";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Herman <Fullsack Engineer / Geoscientist>",
  description:
    "Portfolio of Herman Kwamebour - Software Engineer and Geoscientist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            {children}
            <Analytics />
            <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
