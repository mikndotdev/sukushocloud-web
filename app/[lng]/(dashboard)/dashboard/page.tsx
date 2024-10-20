"use client";
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useClientTranslation } from "@/app/i18n/client";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const router = useRouter();
    const { data: session } = useSession();
    const { t } = useClientTranslation(lng, "dashboard/login");
    const en = lng.split("-")[0] === "en";

    if (session) {
        router.push("/dashboard/manage");
    }

    return (
        <main>
            <div className="flex flex-col items-center justify-center h-screen">
                <Heading size="4xl" className="mb-4 text-white">
                    {t("welcome")}
                </Heading>
                <Button
                    onClick={() =>
                        signIn("logto", { redirectTo: "/dashboard/manage" })
                    }
                    className="mb-4"
                >
                    {t("signIn")}
                </Button>
            </div>
        </main>
    );
}
