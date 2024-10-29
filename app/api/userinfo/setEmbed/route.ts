export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = session.user.id;
    const body = await req.json();
    const header = body.header;
    const footer = body.footer;
    const color = body.color;

    const backendRes = await fetch(
        `https://manager.sukusho.cloud/changeEmbed?key=${process.env.BACKEND_SIGNING_KEY}&id=${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ header, footer, color }),
        },
    );
    if (!backendRes.ok) {
        console.log(backendRes);
        return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
}
