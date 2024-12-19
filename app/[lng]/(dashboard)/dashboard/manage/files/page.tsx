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
import { useState, useEffect, use } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoReload } from "react-icons/io5";
import { Card, CardContent, CardTitle } from "@/app/components/shadcn/ui/card";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { data: session, status } = useSession();
    const { t } = useClientTranslation(lng, "dashboard/files");
    const en = lng === "en";

    interface UserInfo {
        plan: string;
    }

    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState<UserInfo | null>(null);
    const [totalStorage, setTotalStorage] = useState(0);
    const [totalUsage, setTotalUsage] = useState(0);
    const [files, setFiles] = useState<any[]>([]);
    const [infoLoading, setInfoLoading] = useState(true);

    const fetchData = () => {
        setFetching(true);
        fetch("/api/userinfo/fileList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFiles(data);
                setInfoLoading(false);
            });
        setFetching(false);
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchData();
        }
    }, [status]);

    useEffect(() => {
        setInterval(() => {
            if (status === "authenticated") {
                fetchData();
            }
        }, 30000);
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/userinfo/fileList", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setFiles(data);
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
                <div className="flex flex-row space-x-5 mb-5">
                    <Heading size="2xl" className="text-white">
                        {t("Files")}
                    </Heading>
                    <Button
                        onClick={fetchData}
                        className="flex items-center gap-2"
                        disabled={fetching}
                    >
                        <IoReload />
                    </Button>
                </div>

                {/* Recent Files Grid */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                    {files?.map((file: any) => (
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
                                        data?.plan === "FREE" ||
                                        data?.plan === "ProLite"
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
