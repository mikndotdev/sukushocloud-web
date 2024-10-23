"use client";
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { FileComponent } from "@/app/components/fileComponent";
import { GaugeComponent } from "react-gauge-component";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useClientTranslation } from "@/app/i18n/client";
import { useState, useEffect } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Card, CardContent, CardTitle } from "@/app/components/shadcn/ui/card";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { data: session, status } = useSession();
    const { t } = useClientTranslation(lng, "dashboard/index");
    const en = lng === "en";

    interface UserInfo {
        plan: string;
        filesList: any;
    }

    const [data, setData] = useState<UserInfo | null>(null);
    const [totalStorage, setTotalStorage] = useState(0);
    const [totalUsage, setTotalUsage] = useState(0);
    const [files, setFiles] = useState(0);
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
                    setTotalStorage(data.totalStorage);
                    setTotalUsage(data.usedStorage);
                    setFiles(data.files);
                    setInfoLoading(false);
                });
        }
    }, [status]);

    if (status === "loading" || infoLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <main className="w-full p-4 md:p-0">
                <Heading size="4xl" className="text-white break-words">
                    {t("welcomeMessage")} {session?.user.name}
                </Heading>

                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-5">
                    <Heading size="2xl" className="text-white">
                        {t("usage")}
                    </Heading>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Heading size="sm" className="font-bold text-white">
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
                        </Heading>
                        {data?.plan === "FREE" && (
                            <Link
                                href="/dashboard/manage/plan"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    variant="default"
                                    className="bg-yellow-600 hover:bg-yellow-600 animate-pulse w-full sm:w-auto h-8"
                                    disabled={!(status === "authenticated")}
                                >
                                    {t("upgrade")}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mt-3 flex flex-col md:flex-row gap-5 overflow-x-auto pb-4">
                    <Card className="min-w-[384px] w-full md:w-96 border-primary bg-inherit shrink-0">
                        <CardTitle className="text-white text-center mt-3">
                            {t("totalStorage")}
                        </CardTitle>
                        <CardContent className="text-center">
                            <div className="flex flex-row justify-center gap-2">
                                <Heading
                                    size="xl"
                                    className="text-white font-thin"
                                >
                                    {(totalUsage / 1024).toPrecision(1)} GB
                                </Heading>
                                <Heading
                                    size="xl"
                                    className="text-white font-thin"
                                >
                                    / {totalStorage / 1024} GB
                                </Heading>
                            </div>
                            <GaugeComponent
                                value={
                                    (
                                        (totalUsage / totalStorage) *
                                        100
                                    ).toPrecision(1) as unknown as number
                                }
                            />
                        </CardContent>
                    </Card>

                    <Card className="min-w-[384px] w-full md:w-96 border-primary bg-inherit shrink-0 flex flex-col justify-center">
                        <CardTitle className="text-white text-center mt-3">
                            {t("files")}
                        </CardTitle>
                        <CardContent className="text-center">
                            <Heading size="xl" className="text-white font-thin">
                                {files}
                            </Heading>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-row space-x-5 mt-5 mb-5">
                    <Heading size="2xl" className="text-white">
                        {t("recentFiles")}
                    </Heading>
                </div>

                {/* Recent Files Grid */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                    {data?.filesList?.map((file: any) => (
                        <div key={file.id} className="w-full aspect-[384/200]">
                            <FileComponent
                                date={file.date}
                                id={file.id}
                                name={file.name}
                                shortUrl={file.shortUrl}
                                size={file.size}
                                url={file.url}
                                lng={lng}
                                isPremium={
                                    !(
                                        data.plan === "FREE" ||
                                        data.plan === "ProLite"
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
