"use client";
import { Header } from "@/app/components/nUI/Header";
import { Footer } from "@/app/components/nUI/Footer";
import Image from "next/image";
import mikanLogo from "@/app/assets/mikan.png";
import MikanCat from "@/app/assets/mikan-cat.png";
import { useRouter, usePathname } from "next/navigation";
import CookieConsent from "react-cookie-consent";

import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { SiMisskey } from "react-icons/si";

export default function PagesLayout({
    children,
}: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = () => {
        //@ts-ignore
        const pathSegments = pathname.split("/");
        if (pathSegments[1] === "en") {
            pathSegments[1] = "ja";
        } else if (pathSegments[1] === "ja") {
            pathSegments[1] = "en";
        }
        const newPath = pathSegments.join("/");
        router.push(newPath);
    };

    const nav = [
        {
            name: "Homepage",
            href: "/",
        },
        {
            name: "Pricing",
            href: "/pricing",
        },
        {
            name: "Documentation",
            href: "https://docs.sukusho.cloud/",
        },
        {
            name: "Contact",
            href: "https://mikn.dev/contact",
        },
        {
            name: "Payment Center",
            href: "https://payments.mikandev.com/",
        },
    ];

    const social = [
        {
            name: "GitHub",
            href: "https://github.com/mikndotdev",
            color: "hover:text-github hover:bg-github",
            icon: FaGithub,
        },
        {
            name: "Twitter",
            href: "https://twitter.com/kunkunmaamo",
            color: "hover:text-twitter hover:bg-twitter",
            icon: FaTwitter,
        },
        {
            name: "Discord",
            href: "https://discord.gg/FZCN6fjPuG",
            color: "hover:text-discord hover:bg-discord",
            icon: FaDiscord,
        },
        {
            name: "Misskey Server",
            href: "https://ekaki.art/",
            color: "hover:text-misskey hover:bg-misskey",
            icon: SiMisskey,
        },
    ];

    const links = [
        {
            name: "Resouces",
            children: [
                {
                    name: "Payment Center",
                    href: "https://payments.mikandev.com/",
                },
                {
                    name: "About us",
                    href: "/vision",
                },
                {
                    name: "Partners",
                    href: "/partners",
                },
                {
                    name: "Services",
                    href: "/solutions",
                },
                {
                    name: "Blog",
                    href: "https://blog.mikn.dev/",
                },
            ],
        },
        {
            name: "Support",
            children: [
                {
                    name: "Discord",
                    href: "https://discord.gg/FZCN6fjPuG",
                },
                {
                    name: "Contact Info",
                    href: "/contact",
                },
            ],
        },
        {
            name: "Legal",
            children: [
                {
                    name: "Terms of use",
                    href: "https://docs.mikn.dev/legal/terms",
                },
                {
                    name: "Privacy policy",
                    href: "https://docs.mikn.dev/legal/privacy",
                },
                {
                    name: "Payments",
                    href: "https://docs.mikn.dev/legal/jp-payments",
                },
                {
                    name: "GDPR",
                    href: "https://docs.mikn.dev/legal/dpa",
                },
            ],
        },
    ];

    const buttons = [
        {
            href: "/dashboard",
            title: "Dashboard",
            colorScheme: "primary",
        },
        {
            title: "🌎",
            colorScheme: "primary",
            onClick: () => {
                changeLanguage();
            },
        },
    ];

    return (
        <>
            <Header
                navigation={nav}
                //@ts-ignore
                buttons={buttons}
                className="text-white bg-[#6214d2]"
                color="#6214d2"
                brand={{
                    showTitle: true,
                    name: "sukushocloud",
                    href: "/",
                    logo: mikanLogo.src,
                }}
            />
            <div className="mx-auto min-h-screen max-w-7xl px-4 py-24">
                {children}
                <CookieConsent
                    location="bottom"
                    buttonText="Yum! 🍪"
                    cookieName="CookieConsent"
                    style={{ background: "#6214d2" }}
                    buttonStyle={{ color: "", fontSize: "13px" }}
                    expires={150}
                >
                    We use cookies to enhance your experience. Would you like
                    some?
                </CookieConsent>
            </div>
            <Footer
                social={social}
                links={links}
                copylight="2020-2024 MikanDev"
                className="text-white bg-[#6214d2]"
            >
                <div className="flex items-center self-end">
                    <Image
                        src={MikanCat.src}
                        width={200}
                        height={100}
                        alt="MikanDev Tech"
                        className="ml-2 mb-0"
                    />
                </div>
            </Footer>
        </>
    );
}
