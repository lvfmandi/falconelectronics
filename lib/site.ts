import { Icons } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Falcon Electronics",
    description: "The technology doctors",
    footer: {
        locations: [{ name: 'bbs mall Zone E Store GF-098', link: 'https://maps.app.goo.gl/yqdFEzoDu2BYiLHY8' }],
        links: [
            { name: "Home", link: "/" },
            { name: "Contact us", link: "/guides/contacts" },
            { name: "Terms & Conditions", link: "/guides/terms" },
            { name: "Privacy Policy", link: "/guides/privacy-policy" },
            { name: "Shipping Policy", link: "/guides/shipping-policy" },
        ],
    },
}