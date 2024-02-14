"use client";

import { ReactNode } from "react";

// providers
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "react-use-cart";
import { CallWhatsAppProvider } from "./call-whatsapp-provider";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <CartProvider>
      <Toaster />
      {children}
      <CallWhatsAppProvider />
    </CartProvider>
  );
};
