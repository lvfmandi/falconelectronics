"use client";

import { useContext } from "react";

import { siteConfig } from "@/lib/site";
import { Brand, Category } from "@/lib/types";
import Link from "next/link";

// resources
import Logo from "@/public/logo.svg";
import PaymentOptions from "@/public/payments.svg";

// components
import { Icons } from "../icons";
import { NextImage } from "../image";
import { FooterNavItems } from "./footer-nav-items";
import { NavCheckerContext } from "../providers/nav-checker";

interface FooterComponentProps {
  categories: Category[];
  brands: Brand[];
}

export const FooterComponent = ({
  categories,
  brands,
}: FooterComponentProps) => {
  const studio = useContext(NavCheckerContext);
  if (studio) return;

  return (
    <footer className="border-t divide-y">
      <ul className="py-5 container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories
          ?.slice()
          .reverse()
          .map((category) => (
            <li className="uppercase py-1 space-y-2" key={category._id}>
              <span className="text-primary">
                <Link href={`/category/${category.slug.current}`}>
                  {category.name}
                </Link>
              </span>
              <FooterNavItems
                categories={category.otherChildren}
                first={true}
                parentLink={`/category/${category.slug.current}`}
              />
            </li>
          ))}
      </ul>
      <div className="py-5">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link href="/">
            <NextImage src={Logo} alt="Website Logo" width={150} priority />
          </Link>
          <div className="space-y-2">
            <span className="text-primary uppercase">Guides</span>
            <ul className="">
              {siteConfig.footer.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.link}>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-primary uppercase">Brands</span>
            <ul>
              {brands.map((brand) => (
                <li key={brand.slug.current}>
                  <span>
                    <Link href={`/search?brands=${brand.slug.current}`}>
                      {brand.name}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-primary uppercase">Socials</span>
            <ul className="flex gap-[32px]">
              <Link href="">
                <Icons.facebook size={24} color="#0866ff" />
              </Link>
              <Link href="">
                <Icons.twitter size={24} />
              </Link>
              <Link href="">
                <Icons.instagram size={24} color="#d9297f" />
              </Link>
              <Link href="">
                <Icons.tiktok size={24} />
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container flex items-center justify-between py-3">
          <span>© Falcon Electronics</span>
          <NextImage
            src={PaymentOptions}
            alt="Payment Options: Visa, Mastercard, Mpesa, Airtel Money"
            height={20}
          />
        </div>
      </div>
    </footer>
  );
};
