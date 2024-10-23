"use client";
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useClientTranslation } from "@/app/i18n/client";
import { useState, useEffect } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { SiSharex } from "react-icons/si";
import { Input } from "@/app/components/shadcn/ui/input";

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

    if (status === "loading" || infoLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-white" />
            </div>
        );
    }

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

    return (
        <div className="flex min-h-screen">
            <main className="w-full p-4 md:p-0">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <Heading size="2xl" className="text-white">
                        {t("settings")}
                    </Heading>
                </div>
                <div className="flex flex-col md:flex-col gap-3 mt-5">
                    <Heading size="2xl" className="text-white">
                        {t("apiKey")}
                    </Heading>
                    <Input
                        placeholder={apiKey}
                        className="w-96 border-primary"
                        disabled
                    />
                </div>
                <div className="flex flex-row mt-3 space-x-2">
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(data?.apiKey);
                            toast.success(t("copied"));
                        }}
                        className="bg-primary"
                    >
                        <FaCopy className="w-5 h-5" />
                        {t("copy")}
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => resetAPIKey()}
                    >
                        <GrPowerReset className="w-5 h-5" />
                        {t("reset")}
                    </Button>
                    <Button onClick={() => downloadSXCU()}>
                        <SiSharex className="w-5 h-5" />
                        {t("downloadSXCU")}
                    </Button>
                </div>
            </main>
        </div>
    );
}
