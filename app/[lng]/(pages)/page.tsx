"use client";
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { useClientTranslation } from "@/app/i18n/client";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { RainbowButton } from "@/app/components/magicui/RainbowButton";
import { SparklesText } from "@/app/components/magicui/TextSparkle";
import { NumberTicker } from "@/app/components/magicui/numberTicker";
import { BlurIn } from "@/app/components/magicui/BlurIn";
import Particles from "@/app/components/eldoraui/particles";
import { Cobe } from "@/app/components/cobe";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/app/components/shadcn/ui/card";

import {
    MdScreenshotMonitor,
    MdCloudUpload,
    MdManageAccounts,
    MdOutlinePhotoSizeSelectLarge,
} from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { FaW, FaWandMagicSparkles } from "react-icons/fa6";
import { TbWorldShare } from "react-icons/tb";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { t } = useClientTranslation(lng, "index");
    const en = lng === "en";

    return (
        <main className="min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-screen pb-16">
                <Particles className="absolute inset-0 pointer-events-none" />
                <div className="flex flex-col sm:flex-row justify-center items-center text-center">
                    <BlurIn
                        word={t("mainTitle")}
                        className="text-4xl sm:text-6xl font-bold text-white mb-4 sm:mb-0"
                    />
                    <MdCloudUpload className="text-white text-4xl sm:text-6xl sm:ml-5 mt-3 sm:mr-10" />
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-5 text-center">
                    <MdScreenshotMonitor className="text-white text-4xl sm:text-6xl mb-4 sm:mb-0 sm:mr-5 sm:mt-3 sm:ml-10" />
                    <BlurIn
                        className="text-white text-xl sm:text-2xl"
                        word={t("subTitle")}
                    />
                </div>
                <div className="flex flex-col justify-center items-center mt-10 text-center">
                    <Heading size="xl" className="text-gray-400 mb-2">
                        {t("mainDescription")}
                    </Heading>
                    <SparklesText
                        text={t("ultimatePlatform")}
                        colors={{ first: "#FFD700", second: "#FFA500" }}
                        className="text-xl sm:text-2xl text-white"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex flex-col justify-center items-center">
                        <Link href="/dashboard">
                            <RainbowButton className="px-5 py-3 sm:py-5 w-full sm:w-auto">
                                {t("tryFree")}
                            </RainbowButton>
                        </Link>
                        <Heading
                            size="sm"
                            className="text-white font-thin mt-1"
                        >
                            {t("noCard")}
                        </Heading>
                    </div>
                    <Link href="/pricing" className="w-full sm:w-auto">
                        <Button className="px-5 py-3 sm:py-5 w-full">
                            {t("viewPlans")}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex justify-center text-center">
                    <Heading size="3xl" className="text-white">
                        {t("everythingYouNeed")}
                    </Heading>
                </div>
                <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-5 sm:space-y-0 sm:space-x-5">
                    {[
                        {
                            title: "features.upload",
                            description: "features.uploadDescription",
                            icon: MdCloudUpload,
                        },
                        {
                            title: "features.share",
                            description: "features.shareDescription",
                            icon: FaShare,
                        },
                        {
                            title: "features.manage",
                            description: "features.manageDescription",
                            icon: MdManageAccounts,
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="w-full sm:w-96 min-h-40 bg-inherit border-primary"
                        >
                            <CardHeader>
                                <CardTitle className="text-center text-white">
                                    {t(feature.title)}
                                </CardTitle>
                                <CardDescription className="text-center text-gray-400">
                                    {t(feature.description)}
                                </CardDescription>
                                <CardContent>
                                    <feature.icon className="text-6xl sm:text-8xl text-white mx-auto mt-6 sm:mt-10" />
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <SparklesText
                        text={t("andMore")}
                        colors={{ first: "#FFD700", second: "#FFA500" }}
                        className="text-3xl sm:text-4xl text-white"
                        sparklesCount={5}
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-5 sm:space-y-0 sm:space-x-5">
                    {[
                        {
                            title: "features.distribute",
                            description: "features.distributeDescription",
                            icon: TbWorldShare,
                        },
                        {
                            title: "features.transform",
                            description: "features.transformDescription",
                            icon: MdOutlinePhotoSizeSelectLarge,
                        },
                        {
                            title: "features.personalize",
                            description: "features.personalizeDescription",
                            icon: FaWandMagicSparkles,
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="w-full sm:w-96 min-h-40 bg-inherit border-primary"
                        >
                            <CardHeader>
                                <CardTitle className="text-center text-white">
                                    {t(feature.title)}
                                </CardTitle>
                                <CardDescription className="text-center text-gray-400">
                                    {t(feature.description)}
                                </CardDescription>
                                <CardContent>
                                    <feature.icon className="text-6xl sm:text-8xl text-white mx-auto mt-6 sm:mt-10" />
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="flex mt-5 ml-4 sm:ml-10 space-x-1">
                    <Heading size="sm" className="text-gray-400 font-thin">
                        *sukushocloud
                    </Heading>
                    <Heading size="sm" className="text-[#ff7700]">
                        pro
                    </Heading>
                    <Heading size="sm" className="text-gray-400 font-thin">
                        {t("required")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-10 text-center">
                    <Heading size="3xl" className="text-white">
                        {t("designedForSpeed")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-3 text-center">
                    <Heading size="xl" className="text-gray-400">
                        {t("speedDescription")}
                    </Heading>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-10">
                    <div className="w-full sm:w-1/2 mb-10 sm:mb-0">
                        <Cobe />
                    </div>
                    <div className="flex flex-col justify-center space-y-5 w-full sm:w-1/2">
                        {[
                            { value: 42, description: "uploadRegions" },
                            { value: 12, description: "storageRegions" },
                            { value: 119, description: "cdnPOPs" },
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="w-full sm:w-96 min-h-20 bg-inherit border-primary"
                            >
                                <CardHeader>
                                    <CardTitle className="text-center text-white">
                                        <NumberTicker
                                            value={item.value}
                                            className="text-white text-3xl sm:text-4xl"
                                        />
                                    </CardTitle>
                                    <CardDescription className="text-center text-gray-400">
                                        {t(item.description)}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mt-10 text-center">
                    <Heading size="3xl" className="text-white">
                        {t("OSSBIP")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-3 text-center">
                    <Heading size="xl" className="text-gray-400">
                        {t("OSSBIPDescription")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-5">
                    <Link href="https://docs.sukusho.cloud/oss">
                        <Button className="px-5 py-3 sm:py-5">
                            {t("repos")}
                        </Button>
                    </Link>
                </div>
                <div className="flex justify-center mt-14">
                    <Card className="w-full sm:w-11/12 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("readyToGetStarted")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center">
                                <div className="flex flex-col justify-center items-center">
                                    <Link href="/dashboard">
                                        <RainbowButton className="px-5 py-3 sm:py-5">
                                            {t("tryFree")}
                                        </RainbowButton>
                                    </Link>
                                    <Heading
                                        size="sm"
                                        className="text-white font-thin mt-1"
                                    >
                                        {t("noCard")}
                                    </Heading>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
