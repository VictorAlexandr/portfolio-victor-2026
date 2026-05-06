import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Alexandre — Data Engineer & AI Architect",
  description:
    "Production systems for lead qualification, executive BI and LLM agents. Everything here is running.",
  metadataBase: new URL("https://victoralexandre.dev"),
  openGraph: {
    title: "Victor Alexandre",
    description: "Production systems. Not promises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
