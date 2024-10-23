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
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardTitle,
    CardFooter,
    CardDescription,
    CardHeader,
} from "@/app/components/shadcn/ui/card";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { t } = useClientTranslation(lng, "dashboard/plan");
    const en = lng === "en";

    interface UserInfo {
        plan: string;
    }

    const [data, setData] = useState<UserInfo | null>(null);
    const [infoLoading, setInfoLoading] = useState(true);

    const plans = [
        {
            title: t("proLite"),
            blurb: t("proLiteBlurb"),
            price: t("proLitePrice"),
            features: [
                t("everythingInPrev"),
                t("proLiteDescription1"),
                t("proLiteDescription2"),
            ],
            link: "https://payments.mikandev.com/instant-checkout/sksh-pro-lite",
        },
        {
            title: t("proStd"),
            blurb: t("proStdBlurb"),
            price: t("proStdPrice"),
            features: [
                t("everythingInPrev"),
                t("proStdDescription1"),
                t("proStdDescription2"),
                t("proStdDescription3"),
                t("proStdDescription4"),
            ],
            link: "https://payments.mikandev.com/instant-checkout/sksh-pro-std",
        },
        {
            title: t("proUlt"),
            blurb: t("proUltBlurb"),
            price: t("proUltPrice"),
            features: [
                t("everythingInPrev"),
                t("proUltDescription1"),
                t("proUltDescription2"),
                t("proUltDescription3"),
                t("proUltDescription4"),
                { text: t("proUltDescription5"), icon: "heart" },
            ],
            link: "https://payments.mikandev.com/instant-checkout/sksh-pro-ult",
        },
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
                    setInfoLoading(false);
                });
        }
    }, [status]);

    const openPortal = async () => {
        toast.info(t("redirectingToPortal"));
        try {
            const response = await fetch("/api/userinfo/customerPortal", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                toast.error(t("portalError"));
                return;
            }

            const data = await response.json();
            router.push(data.url);
        } catch (error) {
            toast.error(t("portalError"));
        }
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
            <main className="w-full p-4 md:p-0">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <Heading size="2xl" className="text-white">
                        {t("planStatus")}
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
                    </div>
                </div>
                <div className="container mx-auto max-w-7xl pb-16">
                    {data?.plan === "FREE" ? (
                        <div>
                            <div className="flex flex-row bg-inherit border-primary mt-10 space-x-2">
                                <Heading size="2xl" className="text-white">
                                    {t("unlockFeatures")}
                                </Heading>
                                <Heading
                                    size="2xl"
                                    className="text-gray-400 font-thin"
                                >
                                    sukushocloud
                                </Heading>
                                <Heading size="sm" className="text-[#ff7700]">
                                    pro
                                </Heading>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
                                {plans.map((plan, index) => (
                                    <Card
                                        key={index}
                                        className="flex flex-col bg-inherit border-primary"
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-white">
                                                {plan.title}
                                            </CardTitle>
                                            <Heading
                                                size="md"
                                                className="text-gray-300"
                                            >
                                                {plan.blurb}
                                            </Heading>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            {plan.features.map(
                                                (feature, fIndex) => (
                                                    <CardDescription
                                                        key={fIndex}
                                                        className="text-gray-300 mb-2"
                                                    >
                                                        {typeof feature ===
                                                        "string" ? (
                                                            <FaCheckCircle className="inline mr-2 text-green-500" />
                                                        ) : (
                                                            <FaHeart className="inline mr-2 text-red-500" />
                                                        )}
                                                        {typeof feature ===
                                                        "string"
                                                            ? feature
                                                            : feature.text}
                                                    </CardDescription>
                                                ),
                                            )}
                                        </CardContent>
                                        <CardFooter className="flex justify-between items-center">
                                            <Link href={plan.link}>
                                                <Button>
                                                    {t("getStarted")}
                                                </Button>
                                            </Link>
                                            <Heading
                                                size="sm"
                                                className="text-white"
                                            >
                                                {plan.price}
                                            </Heading>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-row bg-inherit border-primary mt-10 space-x-2">
                                <Heading
                                    size="2xl"
                                    className="text-white font-thin"
                                >
                                    {t("customerPortal")}
                                </Heading>
                            </div>
                            <Button
                                className="w-full sm:w-auto mt-3"
                                onClick={() => openPortal()}
                            >
                                {t("manageSubscription")}
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
