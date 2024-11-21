export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_KEY,
})

interface Props {
    params: {
        key: string;
    };
}

export async function GET(req: NextRequest, key: string) {
    const apiKey = await redis.get(key);

    if (!apiKey) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    else {
        redis.del(key);
        return NextResponse.json({ key: apiKey });
    }
}