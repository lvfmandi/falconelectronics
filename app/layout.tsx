import type { Metadata } from "next";

// fonts
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

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
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Noor Electronics",
  description: "Buy electronics at Noor Electronics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} font-jetbrains`}>
        <Providers>
          <DesktopNav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
