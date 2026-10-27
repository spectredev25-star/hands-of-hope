import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hands of Hope | Connecting Generosity with Need",
    template: "%s | Hands of Hope",
  },
  description:
    "Hands of Hope connects people seeking assistance with available resources and organisations working to support their communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${manrope.variable} font-sans`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}