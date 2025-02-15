import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Auth Next js 13",
  description: "Sistema de autenticacion con Next js 13",
};

interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <main className="min-h-screen flex flex-col items-center justify-center bg-red-600">
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  );
}
