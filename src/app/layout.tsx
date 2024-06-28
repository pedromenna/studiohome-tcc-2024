import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import clsx from "clsx";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";

import primeiroImg from 'primeiro.png';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Home",
  description: "Studio Home Next",
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
            <main className="h-screen p-16">
              {children}
            </main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
