import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.redirect("https://sukusho.cloud/dashboard");
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.redirect(
            "https://sukusho.cloud/dashboard?deleted=failed",
        );
    }

    const fileData = await fetch(
        `https://manager.sukusho.cloud/getFile?key=${process.env.BACKEND_SIGNING_KEY}&id=${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!fileData.ok) {
        return NextResponse.redirect(
            "https://sukusho.cloud/dashboard?deleted=failed",
        );
    }

    const fileJson = await fileData.json();

    if (fileJson.userId !== session.user.id) {
        return NextResponse.redirect("https://sukusho.cloud/dashboard");
    }

    const deleteFile = await fetch(
        `https://manager.sukusho.cloud/deleteImage?key=${process.env.BACKEND_SIGNING_KEY}&id=${session.user.id}&fileId=${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!deleteFile.ok) {
        return NextResponse.redirect(
            "https://sukusho.cloud/dashboard?deleted=failed",
        );
    }

    return NextResponse.redirect(
        "https://sukusho.cloud/dashboard/manage?deleted=true",
    );
}
