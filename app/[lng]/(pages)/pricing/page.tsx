"use client";
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { useClientTranslation } from "@/app/i18n/client";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/app/components/shadcn/ui/card";

import { FaCheckCircle, FaHeart } from "react-icons/fa";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { t } = useClientTranslation(lng, "pricing");
    const en = lng === "en";

    const plans = [
        {
            title: t("free"),
            blurb: t("freeBlurb"),
            price: t("freePrice"),
            features: [
                t("freeDescription1"),
                t("freeDescription2"),
                t("freeDescription3"),
                t("freeDescription4"),
                t("freeDescription5"),
            ],
            link: "/dashboard",
        },
        {
            title: t("proLite"),
            blurb: t("proLiteBlurb"),
            price: t("proLitePrice"),
            features: [
                t("everythingInPrev"),
                t("proLiteDescription1"),
                t("proLiteDescription2"),
            ],
            link: "/dashboard/upgrade",
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
            link: "/dashboard/upgrade",
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
            link: "/dashboard/upgrade",
        },
    ];

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="container mx-auto max-w-7xl pb-16">
                <div className="text-center mb-12">
                    <Heading size="4xl" className="text-white mb-4">
                        {t("goodPricing")}
                    </Heading>
                    <Heading size="2xl" className="text-gray-400">
                        {t("manyPlans")}
                    </Heading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className="flex flex-col bg-inherit border-primary"
                        >
                            <CardHeader>
                                <CardTitle className="text-white">
                                    {plan.title}
                                </CardTitle>
                                <Heading size="md" className="text-gray-300">
                                    {plan.blurb}
                                </Heading>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <CardDescription
                                        key={fIndex}
                                        className="text-gray-300 mb-2"
                                    >
                                        {typeof feature === "string" ? (
                                            <FaCheckCircle className="inline mr-2 text-green-500" />
                                        ) : (
                                            <FaHeart className="inline mr-2 text-red-500" />
                                        )}
                                        {typeof feature === "string"
                                            ? feature
                                            : feature.text}
                                    </CardDescription>
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Link href={plan.link}>
                                    <Button>{t("getStarted")}</Button>
                                </Link>
                                <Heading size="sm" className="text-white">
                                    {plan.price}
                                </Heading>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
