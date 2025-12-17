import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vittam - AI-Driven Sales Automation for NBFCs",
  description: "Accelerate personal loan sales from days to minutes with Vittam's multi-agent AI system.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main
        className={`${geistSans.variable} ${geistMono.variable} flex-1 min-h-screen`}
      >
        {children}
      </main>

      <Footer />

      <Toaster position="top-center" richColors theme="light" />

      {/* Chat widget (marketing only) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.process = window.process || { env: {} };
          `,
        }}
      />
      <script
        src="http://localhost:5173/chat-widget.js"
        data-bot-id="acme"
        data-position="bottom-right"
        data-width="360"
        data-height="520"
        defer
      />
    </>
  );
}