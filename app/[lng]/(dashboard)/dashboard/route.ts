export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

export async function GET() {
    const session = await auth();

    if (session) {
        redirect("/dashboard/manage");
    } else {
        ("use server");
        await signIn("logto", { redirectTo: "/dashboard/manage" });
    }
}
