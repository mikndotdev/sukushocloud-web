"use client";
import Flag from "react-flagkit";

export const runtime = "edge";

import Link from "next/link";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/shadcn/ui/select";
import { Input } from "@/app/components/shadcn/ui/input";
import { toast } from "sonner";
import {
    DiscordMessage,
    DiscordMessages,
    DiscordEmbed,
} from "@danktuary/react-discord-message";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { SketchPicker } from "react-color";
import { useClientTranslation } from "@/app/i18n/client";
import { useState, useEffect } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { SiSharex } from "react-icons/si";

import Screenshot from "@/app/assets/dev-is-a-weeb.png";
import { FaFloppyDisk } from "react-icons/fa6";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { t } = useClientTranslation(lng, "dashboard/settings");
    const en = lng === "en";

    interface UserInfo {
        plan: string;
        apiKey: string;
    }

    const [data, setData] = useState<UserInfo | null>(null);
    const [apiKey, setApiKey] = useState("");
    const [infoLoading, setInfoLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [embedHeader, setEmbedHeader] = useState("");
    const [embedFooter, setEmbedFooter] = useState("");
    const [embedColor, setEmbedColor] = useState("");

    const regions = [
        { name: t("fra"), value: "fra", flag: "DE" },
        { name: t("lhr"), value: "lhr", flag: "GB" },
        { name: t("mad"), value: "mad", flag: "ES" },
        { name: t("iad"), value: "iad", flag: "US" },
        { name: t("ord"), value: "ord", flag: "US" },
        { name: t("sjc"), value: "sjc", flag: "US" },
        { name: t("gru"), value: "gru", flag: "BR" },
        { name: t("jnb"), value: "jnb", flag: "ZA" },
        { name: t("nrt"), value: "nrt", flag: "JP" },
        { name: t("hkg"), value: "hkg", flag: "HK" },
        { name: t("sin"), value: "sin", flag: "SG" },
        { name: t("syd"), value: "syd", flag: "AU" },
    ];

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
                    setApiKey(data.apiKey);
                    setSelectedRegion(data.preferredRegion);
                    setEmbedHeader(data.embedHeader);
                    setEmbedFooter(data.embedFooter);
                    setEmbedColor(data.embedColor);
                    setInfoLoading(false);
                });
        }
    }, [status]);

    const resetAPIKey = async () => {
        const res = await fetch("/api/userinfo/resetAPIKey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            toast.error(t("resetError"));
            return;
        }
        const json = await res.json();
        setApiKey(json.key);
        toast.success(t("resetSuccess"));
    };

    const setSelectecdRegion = (region: string) => {
        fetch("/api/userinfo/setRegion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ region }),
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error(t("generalError"));
                    return;
                }
                return res.json();
            })
            .then((json) => {
                setSelectedRegion(json.region);
                toast.success(t("regionSet"));
            })
            .catch(() => {
                toast.error(t("generalError"));
            });
    };

    const downloadSXCU = async () => {
        const sxcu = JSON.stringify(
            {
                Version: "16.1.0",
                Name: "sukushocloud - Upload file",
                DestinationType: "ImageUploader",
                RequestMethod: "POST",
                RequestURL: "https://api.sukusho.cloud/upload",
                Headers: {
                    Authorization: `Bearer ${data?.apiKey}`,
                },
                Body: "MultipartFormData",
                FileFormName: "file",
                URL: "{json:shortUrl}",
            },
            null,
            2,
        );

        const blob = new Blob([sxcu], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sukushocloud.sxcu";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const saveEmbed = async () => {
        const res = await fetch("/api/userinfo/setEmbed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                header: embedHeader,
                footer: embedFooter,
                color: embedColor,
            }),
        });
        if (!res.ok) {
            toast.error(t("generalError"));
            return;
        }
        const json = await res.json();
        toast.success(t("embedSaved"));
    };

    if (status === "loading" || infoLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <main className="w-full px-4 md:px-0 max-w-7xl mx-auto">
                <div className="space-y-6 pb-10">
                    {/* Header */}
                    <div className="flex flex-col space-y-2">
                        <Heading size="2xl" className="text-white">
                            {t("settings")}
                        </Heading>
                    </div>

                    {/* API Key Section */}
                    <div className="space-y-4">
                        <Heading size="2xl" className="text-white">
                            {t("apiKey")}
                        </Heading>

                        {/* API Key Input - Full width on mobile */}
                        <div className="w-full md:w-96">
                            <Input
                                placeholder={apiKey}
                                className="w-full border-primary"
                                disabled
                            />
                        </div>

                        {/* Action Buttons - Stack on mobile, row on desktop */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                            <Button
                                onClick={() => {
                                    if (data?.apiKey) {
                                        navigator.clipboard.writeText(
                                            data.apiKey,
                                        );
                                        toast.success(t("copied"));
                                    } else {
                                        toast.error(t("copyError"));
                                    }
                                }}
                                className="w-full sm:w-auto bg-primary"
                            >
                                <FaCopy className="w-5 h-5 mr-2" />
                                {t("copy")}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => resetAPIKey()}
                                className="w-full sm:w-auto"
                            >
                                <GrPowerReset className="w-5 h-5 mr-2" />
                                {t("reset")}
                            </Button>
                            <Button
                                onClick={() => downloadSXCU()}
                                className="w-full sm:w-auto"
                            >
                                <SiSharex className="w-5 h-5 mr-2" />
                                {t("downloadSXCU")}
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Heading size="2xl" className="text-white">
                            {t("prefRegion")}
                        </Heading>
                        <Select
                            value={selectedRegion}
                            onValueChange={setSelectecdRegion}
                        >
                            <SelectTrigger className="border-primary w-1/2">
                                <SelectValue placeholder={t("selectRegion")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="">
                                    {regions.map((region) => (
                                        <SelectItem value={region.value}>
                                            <div className="flex items-center gap-2">
                                                <span>{region.name}</span>
                                                <Flag
                                                    country={region.flag}
                                                    className="w-6 h-6"
                                                />
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <Heading size="2xl" className="text-white">
                            {t("embedSettings")}
                        </Heading>
                        <Input
                            value={embedHeader}
                            onChange={(e) => setEmbedHeader(e.target.value)}
                            placeholder={t("embedHeader")}
                            className="w-1/2 border-primary"
                        />
                        <div className="flex flex-row items-center space-x-2">
                            <Input
                                value={embedFooter}
                                onChange={(e) => setEmbedFooter(e.target.value)}
                                placeholder={t("embedFooter")}
                                className="w-1/2 border-primary"
                                disabled={data?.plan === "FREE" || data?.plan === "ProLite"}
                            />
                            {data?.plan == "FREE" || data?.plan == "ProLite" && (
                                <div className="flex flex-row space-x-1">
                                    <Link href={"/dashboard/manage/plan"}>
                                        <Heading
                                            size="xl"
                                            className="text-yellow-400 font-thin"
                                        >
                                            {t("upgrade")}
                                        </Heading>
                                    </Link>
                                    <Heading
                                        size="xl"
                                        className="text-white font-thin"
                                    >
                                        {t("toUnlock")}
                                    </Heading>
                                </div>
                            )}
                        </div>
                        <SketchPicker
                            color={embedColor}
                            onChange={(color: any) => setEmbedColor(color.hex)}
                            className="w-full"
                        />
                        <Heading size="2xl" className="text-white">
                            {t("embedPreview")}
                        </Heading>
                        <DiscordMessages>
                            <DiscordMessage
                                author={session?.user.name}
                                avatar={session?.user.image}
                            >
                                https://sksh.me/example
                                <DiscordEmbed
                                    color={embedColor}
                                    slot="embeds"
                                    title={embedHeader}
                                    image={Screenshot.src}
                                    url="#"
                                >
                                    {embedFooter}
                                </DiscordEmbed>
                            </DiscordMessage>
                        </DiscordMessages>
                        <Button onClick={() => saveEmbed()} className="">
                            <FaFloppyDisk className="w-5 h-5 mr-2" />
                            {t("save")}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
