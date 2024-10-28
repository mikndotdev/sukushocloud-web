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
    const region = body.region;

    const backendRes = await fetch(
        `https://manager.sukusho.cloud/changeRegion?key=${process.env.BACKEND_SIGNING_KEY}&id=${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ region }),
        },
    );

    if (!backendRes.ok) {
        console.log(backendRes);
        return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }

    const data = await backendRes.json();

    return NextResponse.json(data);
}
