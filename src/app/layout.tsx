import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import clsx from "clsx";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Home | Música para Sua Vida",
  description: "Sua Loja de Música Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={clsx(inter.className)} style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
          <Hydrate>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
