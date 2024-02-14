"use client";

// types and resources
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type PurchaseOptions = {
  options: { [key: string]: string };
  variants: { [key: string]: string };
};

type PurchaseOptionsContext = {
  purchaseOptions: PurchaseOptions;
  setPurchaseOptions: Dispatch<SetStateAction<PurchaseOptions>>;
};

const PurchaseOptionsContext = createContext<PurchaseOptionsContext | null>(
  null
);

export const usePurchaseOptions = () => {
  const context = useContext(PurchaseOptionsContext);
  if (!context) {
    throw new Error(
      "usePurchaseOptions should be used within PurchaseOptionsProvider"
    );
  }

  return context;
};

interface PurchaseOptionsProviderProps {
  children: ReactNode;
}

export const PurchaseOptionsProvider = ({
  children,
}: PurchaseOptionsProviderProps) => {
  const [purchaseOptions, setPurchaseOptions] = useState<PurchaseOptions>({
    options: {},
    variants: {},
  });

  return (
    <PurchaseOptionsContext.Provider
      value={{ purchaseOptions, setPurchaseOptions }}
    >
      {children}
    </PurchaseOptionsContext.Provider>
  );
};
