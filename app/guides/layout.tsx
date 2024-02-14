"use client";

import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="container flex flex-col lg:grid lg:grid-cols-[1fr_3fr] py-8 gap-4 font-inter">
      <div className="">
        <ul className="">
          {siteConfig.footer.links.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>
                <p
                  className={`${
                    pathName === link.link ? "text-primary" : "text-gray-500"
                  } hover:text-primary`}
                >
                  {link.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}
