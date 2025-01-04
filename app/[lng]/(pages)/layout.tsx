"use client";
import { useClientTranslation } from "@/app/i18n/client";
import { Header } from "@/app/components/nUI/Header";
import { Footer } from "@/app/components/nUI/Footer";
import Image from "next/image";
import mikanLogo from "@/app/assets/mikan.png";
import MikanCat from "@/app/assets/mikan-cat.png";
import { useRouter, usePathname } from "next/navigation";
import CookieConsent from "react-cookie-consent";

import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { SiMisskey } from "react-icons/si";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/components/shadcn/ui/tooltip";

interface Props {
    params: {
        lng: string;
    };
    children: React.ReactNode;
}

export default function PagesLayout({ params: { lng }, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useClientTranslation(lng, "index");
    const en = lng === "en";

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
            name: t("navigation.home"),
            href: "/",
        },
        {
            name: t("navigation.pricing"),
            href: "/pricing",
        },
        {
            name: t("navigation.app"),
            href: "/app",
        },
        {
            name: t("navigation.docs"),
            href: "https://docs.sukusho.cloud/",
        },
        {
            name: t("navigation.contact"),
            href: "https://mikn.dev/contact",
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
            name: t("navigation.resources"),
            children: [
                {
                    name: t("navigation.payments"),
                    href: "https://payments.mikandev.com/",
                },
                {
                    name: t("navigation.solutions"),
                    href: "https:/mikn.dev/solutions",
                },
                {
                    name: t("navigation.blog"),
                    href: "https://blog.mikn.dev/",
                },
            ],
        },
        {
            name: t("navigation.support"),
            children: [
                {
                    name: t("navigation.discord"),
                    href: "https://discord.gg/FZCN6fjPuG",
                },
                {
                    name: t("navigation.contact"),
                    href: "https://mikn.dev/contact",
                },
            ],
        },
        {
            name: t("navigation.legal"),
            children: [
                {
                    name: t("navigation.terms"),
                    href: "https://docs.mikn.dev/legal/terms",
                },
                {
                    name: t("navigation.privacy"),
                    href: "https://docs.mikn.dev/legal/privacy",
                },
                {
                    name: t("navigation.jp-payments"),
                    href: "https://docs.mikn.dev/legal/jp-payments",
                },
                {
                    name: t("navigation.gdpr"),
                    href: "https://docs.mikn.dev/legal/dpa",
                },
            ],
        },
    ];

    const buttons = [
        {
            href: "/dashboard",
            title: t("navigation.dashboard"),
        },
        {
            title: "🌎",
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
                    buttonStyle={{
                        color: "#FFFFFF",
                        fontSize: "13px",
                        background: "#7c3aed",
                    }}
                    expires={150}
                >
                    We use cookies to enhance your experience. Would you like
                    some?
                </CookieConsent>
            </div>
            <Footer
                social={social}
                links={links}
                copylight={`2020-${new Date().getFullYear()} MikanDev`}
                className="text-white bg-[#6214d2]"
            >
                <div className="flex items-center self-end">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Image
                                    src={MikanCat.src}
                                    width={200}
                                    height={100}
                                    alt="MikanDev Tech"
                                    className="ml-2 mb-0"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>:3</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </Footer>
        </>
    );
}
