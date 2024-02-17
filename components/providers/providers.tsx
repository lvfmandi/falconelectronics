"use client";

import { ReactNode } from "react";

// providers
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "react-use-cart";
import { CallWhatsAppProvider } from "./call-whatsapp-provider";
import { NavChecker } from "./nav-checker";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <CartProvider>
      <Toaster />
      <NavChecker>{children}</NavChecker>
      <CallWhatsAppProvider />
    </CartProvider>
  );
};
