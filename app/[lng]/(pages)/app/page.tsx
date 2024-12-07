"use client";
import { RainbowButton } from "@/app/components/magicui/RainbowButton";

export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { useClientTranslation } from "@/app/i18n/client";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { BlurIn } from "@/app/components/magicui/BlurIn";
import Particles from "@/app/components/eldoraui/particles";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { t } = useClientTranslation(lng, "app");
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
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-5 text-center">
                    <BlurIn
                        className="text-white text-xl sm:text-2xl"
                        word={t("subTitle")}
                    />
                </div>
                <div className="flex flex-col justify-center items-center mt-10 text-center">
                    <Heading size="xl" className="text-gray-400 mb-2">
                        {t("mainDescription")}
                    </Heading>
                </div>
                <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                        href="https://github.com/mikndotdev/sukushocloud-client/releases/latest"
                        className="w-full sm:w-auto"
                    >
                        <Button className="px-5 py-3 sm:py-5 w-full">
                            {t("download")}
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
