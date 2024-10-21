"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "./shadcn/ui/sidebar";
import { Card, CardHeader, CardContent, CardFooter } from "./shadcn/ui/card";
import { Button } from "./shadcn/ui/button";
import { useClientTranslation } from "@/app/i18n/client";
import { use, useEffect, useState } from "react";

import mikan from "@/app/assets/mikan.png";
import MikanLogo from "@/app/assets/mikan-vtube.svg";
import { FaGlobeAmericas, FaHome, FaFile } from "react-icons/fa";
import { FaGear, FaMoneyBill } from "react-icons/fa6";

interface Props {
    params: {
        lng: string;
    };
}

export function AppSidebar({ params: { lng } }: Props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useClientTranslation(lng, "dashboard/sidebar");
    const en = lng === "en";

    interface UserInfo {
        plan: string;
    }

    const [data, setData] = useState<UserInfo | null>(null);
    const [infoLoading, setInfoLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/userinfo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    setInfoLoading(false);
                });
        }
    }, [status]);

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

    return (
        <Sidebar className="border-primary" variant="sidebar">
            <SidebarHeader>
                <div className="flex flex-row items-center justify-center">
                    <Image
                        src={mikan}
                        alt="mikan"
                        width={40}
                        height={40}
                        className=""
                    />
                    <h1 className="text-xl font-bold text-white ml-2">
                        {t("name")}
                    </h1>
                </div>
                <div className="flex items-center justify-center">
                    <h1 className="text-md font-bold text-white">
                        {t("dashboard")}
                    </h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="space-y-2">
                    <Link href="/dashboard/manage">
                        <Button variant="default" className="w-full text-white">
                            <FaHome className="mr-1" />
                            {t("home")}
                        </Button>
                    </Link>
                    <Link href="/dashboard/manage/files">
                        <Button variant="default" className="w-full text-white">
                            <FaFile className="mr-1" />
                            {t("files")}
                        </Button>
                    </Link>
                    <Link href="/dashboard/manage/settings">
                        <Button variant="default" className="w-full text-white">
                            <FaGear className="mr-1" />
                            {t("settings")}
                        </Button>
                    </Link>
                    <Link href="/dashboard/manage/plan">
                        <Button variant="default" className="w-full text-white">
                            <FaMoneyBill className="mr-1" />
                            {t("plan")}
                        </Button>
                    </Link>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    onClick={() => changeLanguage()}
                    variant="outline"
                    className="border-primary bg-inherit text-white hover:bg-inherit hover:text-white"
                >
                    <FaGlobeAmericas className="mr-1" />
                    {t("changeLng")}
                </Button>
                <Card className="w-full bg-inherit border-primary">
                    {status === "loading" || infoLoading ? (
                        <CardHeader>
                            <div className="flex flex-row items-center justify-center">
                                <AiOutlineLoading3Quarters
                                    className="animate-spin text-white"
                                    size={40}
                                />
                            </div>
                        </CardHeader>
                    ) : (
                        <>
                            <CardHeader>
                                <div className="flex flex-row items-center justify-center">
                                    <Image
                                        src={
                                            session?.user?.image ||
                                            "/avatar.png"
                                        }
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                        unoptimized
                                    />
                                    <div className="flex flex-col items-start justify-center ml-2">
                                        <h1 className="text-sm font-bold text-white">
                                            {session?.user?.name}
                                        </h1>
                                        <h1 className="text-xs font-bold text-white">
                                            UID {session?.user?.id}
                                        </h1>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <h1 className="text-sm font-bold text-white">
                                    {t("plan")}:{" "}
                                    {data?.plan === "FREE"
                                        ? t("free")
                                        : data?.plan === "ProLite"
                                          ? "Pro Lite"
                                          : data?.plan === "ProStd"
                                            ? "Pro Standard"
                                            : data?.plan === "ProUlt"
                                              ? "Pro Ultra"
                                              : "Unknown"}
                                </h1>
                            </CardFooter>
                        </>
                    )}
                </Card>
                {data?.plan === "FREE" && (
                    <Link href="/dashboard/manage/plan">
                        <Button
                            variant="default"
                            className="bg-yellow-600 hover:bg-yellow-600 animate-pulse w-full"
                            disabled={!(status === "authenticated")}
                        >
                            {t("upgrade")}
                        </Button>
                    </Link>
                )}
                <Button
                    onClick={() => signOut()}
                    variant="destructive"
                    disabled={!(status === "authenticated")}
                >
                    {t("signOut")}
                </Button>
                <div className="flex flex-row items-center justify-center">
                    <Link href="https://mikn.dev/">
                        <Image
                            src={MikanLogo}
                            alt="MikanDev"
                            width={100}
                            height={100}
                            className=" mt-3 mb-3"
                        />
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
