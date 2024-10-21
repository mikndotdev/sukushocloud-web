export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = session.user.id;

    const backendRes = await fetch(
        `https://manager.sukusho.cloud/getInfo?id=${id}&key=${process.env.BACKEND_SIGNING_KEY}`,
    );

    if (!backendRes.ok) {
        return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }

    const data = await backendRes.json();

    return NextResponse.json(data);
}
