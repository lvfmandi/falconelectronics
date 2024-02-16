import type { Metadata } from "next";

// fonts
import { Inter } from "next/font/google";
import { Schibsted_Grotesk } from "next/font/google";

// styles
import "./globals.css";

// components
import { DesktopNav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import { Providers } from "@/components/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const schibsted_grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted_grotesk",
});

export const metadata: Metadata = {
  title: "Falcon Electronics",
  description: "Buy electronics at Falcon Electronics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${schibsted_grotesk.variable} font-schibsted_grotesk`}>
        <Providers>
          <DesktopNav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
