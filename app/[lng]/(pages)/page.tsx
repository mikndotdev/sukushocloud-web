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
    const en = lng.split("-")[0] === "en";

    return (
        <main className="min-h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen pb-16">
                <Particles className="absolute inset-0 pointer-events-none" />
                <div className="flex justify-center">
                    <BlurIn
                        word={t("mainTitle")}
                        className="text-6xl font-bold text-white "
                    />
                    <MdCloudUpload className="text-white text-6xl ml-5 mt-3 mr-10" />
                </div>
                <div className="flex justify-center mt-5">
                    <MdScreenshotMonitor className="text-white text-6xl mr-5 mt-3 ml-10" />
                    <BlurIn
                        className="text-white text-2xl"
                        word={t("subTitle")}
                    />
                </div>
                <div className="flex justify-center mt-10">
                    <Heading size="2xl" className="text-gray-400">
                        {t("mainDescription")}
                    </Heading>
                    <SparklesText
                        text={t("ultimatePlatform")}
                        colors={{ first: "#FFD700", second: "#FFA500" }}
                        className="ml-2 text-2xl text-white"
                    />
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-col justify-center items-center">
                        <Link href="/dashboard">
                            <RainbowButton className="px-5 py-5">
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
                    <Link href="/pricing">
                        <Button className="ml-3 px-5 py-5 mt-0.5">
                            {t("viewPlans")}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex justify-center">
                    <Heading size="4xl" className="text-white">
                        {t("everythingYouNeed")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-10 space-x-5">
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.upload")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.uploadDescription")}
                            </CardDescription>
                            <CardContent>
                                <MdCloudUpload className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.share")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.shareDescription")}
                            </CardDescription>
                            <CardContent>
                                <FaShare className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.manage")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.manageDescription")}
                            </CardDescription>
                            <CardContent>
                                <MdManageAccounts className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex justify-center mt-10">
                    <SparklesText
                        text={t("andMore")}
                        colors={{ first: "#FFD700", second: "#FFA500" }}
                        className="ml-2 text-4xl text-white"
                        sparklesCount={5}
                    />
                </div>
                <div className="flex justify-center mt-10 space-x-5">
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.distribute")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.distributeDescription")}
                            </CardDescription>
                            <CardContent>
                                <TbWorldShare className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.transform")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.transformDescription")}
                            </CardDescription>
                            <CardContent>
                                <MdOutlinePhotoSizeSelectLarge className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="w-96 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("features.personalize")}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {t("features.personalizeDescription")}
                            </CardDescription>
                            <CardContent>
                                <FaWandMagicSparkles className="text-8xl text-white mx-auto mt-10" />
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex mt-5 ml-10 space-x-1">
                    <Heading size="md" className="text-gray-400 font-thin">
                        *sukushocloud
                    </Heading>
                    <Heading size="md" className="text-[#ff7700]">
                        pro
                    </Heading>
                    <Heading size="md" className="text-gray-400 font-thin">
                        {t("required")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-5">
                    <Heading size="4xl" className="text-white">
                        {t("designedForSpeed")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-3">
                    <Heading size="2xl" className="text-gray-400">
                        {t("speedDescription")}
                    </Heading>
                </div>
                <div className="flex flex-row justify-center">
                    <Cobe />
                    <div className="flex flex-col justify-center space-y-5">
                        <Card className="w-96 min-h-20 bg-inherit border-primary">
                            <CardHeader>
                                <CardTitle className="text-center text-white">
                                    <NumberTicker
                                        value={9}
                                        className="text-white text-4xl"
                                    />
                                </CardTitle>
                                <CardDescription className="text-center text-gray-400">
                                    {t("uploadRegions")}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="w-96 min-h-20 bg-inherit border-primary">
                            <CardHeader>
                                <CardTitle className="text-center text-white">
                                    <NumberTicker
                                        value={12}
                                        className="text-white text-4xl"
                                    />
                                </CardTitle>
                                <CardDescription className="text-center text-gray-400">
                                    {t("storageRegions")}
                                </CardDescription>
                            </CardHeader>
                        </Card>{" "}
                        <Card className="w-96 min-h-20 bg-inherit border-primary">
                            <CardHeader>
                                <CardTitle className="text-center text-white">
                                    <NumberTicker
                                        value={119}
                                        className="text-white text-4xl"
                                    />
                                </CardTitle>
                                <CardDescription className="text-center text-gray-400">
                                    {t("cdnPOPs")}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <Heading size="4xl" className="text-white">
                        {t("OSSBIP")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-3">
                    <Heading size="2xl" className="text-gray-400">
                        {t("OSSBIPDescription")}
                    </Heading>
                </div>
                <div className="flex justify-center mt-5">
                    <Link href="https://docs.sukusho.cloud/oss">
                        <Button className="px-5 py-5">{t("repos")}</Button>
                    </Link>
                </div>
                <div className="flex justify-center mt-14">
                    <Card className="w-11/12 min-h-40 bg-inherit border-primary">
                        <CardHeader>
                            <CardTitle className="text-center text-white">
                                {t("readyToGetStarted")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center space-x-5">
                                <div className="flex flex-col justify-center items-center">
                                    <Link href="/dashboard">
                                        <RainbowButton className="px-5 py-5">
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
