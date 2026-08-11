import type { Metadata } from "next";
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import "./globals.css";

const inter = localFont({
  src: './fonts/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ArenaIQ — Smart Stadium Operations for FIFA World Cup 2026™",
  description: "GenAI-powered smart stadium platform for FIFA World Cup 2026. Real-time crowd management, AI-driven fan navigation, multi-language assistance, and staff coordination.",
  icons: {
    icon: "/favicon.ico",
  },
};

// RootLayout must be async so that calling `headers()` opts every page into
// dynamic rendering. Next.js then parses the per-request Content-Security-Policy
// response header (set by middleware) on every render and automatically stamps
// the extracted nonce onto every script / inline-script tag it injects —
// including the React hydration bundle. Without this, those tags have no nonce
// and the `script-src 'nonce-…' 'strict-dynamic'` CSP blocks them, preventing
// React from ever hydrating the page.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading the nonce here is the official Next.js CSP pattern:
  // https://nextjs.org/docs/app/guides/content-security-policy
  // The value is forwarded by middleware via the x-nonce request header.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
