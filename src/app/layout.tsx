import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Alexandre — Arquiteto de IA & Engenheiro de Dados",
  description:
    "Portfólio de Victor Alexandre. Arquiteto de IA e Engenheiro de Dados transformando dados em ação via BI as Code.",
  metadataBase: new URL("https://victoralexandre.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-white/10">
        {children}
      </body>
    </html>
  );
}
