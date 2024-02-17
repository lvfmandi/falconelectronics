"use client";

import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export const NavCheckerContext = createContext(false);

export function NavChecker({ children }: { children: ReactNode }) {
  const [isStudio, setIsStudio] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsStudio(pathname.startsWith("/studio"));
  }, []);

  return (
    <NavCheckerContext.Provider value={isStudio}>
      {children}
    </NavCheckerContext.Provider>
  );
}
