import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FloatingChat from "@/components/FloatingChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Return App",
  description: "Return App sidebar navigation — Figma replication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="flex min-h-screen bg-neutral-0">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
          <FloatingChat />
        </div>
      </body>
    </html>
  );
}
