import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project REACH — Before You Borrow, Know Your Business",
  description:
    "AI-powered hyper-local business advisory and financial structuring platform for rural micro-entrepreneurs in India. Check business viability before taking a loan.",
  // generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
