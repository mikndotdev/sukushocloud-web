"use client";
export const runtime = "edge";

import { useClientTranslation } from "@/app/i18n/client";
import { Heading } from "@/app/components/nUI/Heading";

import { FaCheckCircle } from "react-icons/fa";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const { t } = useClientTranslation(lng, "appauth");
    const en = lng === "en";

    return (
        <main className="min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-screen pb-16">
                <div className="flex flex-col sm:flex-row justify-center items-center mt-5 text-center">
                    <FaCheckCircle className="text-green-500 text-5xl mb-4 sm:mb-0 mr-5" />
                    <Heading size="6xl" className="text-white mb-2">
                        {t("authComplete")}
                    </Heading>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 text-center">
                    <Heading size="xl" className="text-gray-400 mb-2">
                        {t("windowCloseOK")}
                    </Heading>
                </div>
            </div>
        </main>
    );
}
