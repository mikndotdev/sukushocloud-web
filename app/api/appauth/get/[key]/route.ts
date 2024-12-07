export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis/cloudflare";

const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_KEY,
});

interface Props {
    params: {
        key: string;
    };
}

export async function GET(req: NextRequest, { params: { key } }: Props) {
    console.log(key);
    const apiKey = await redis.get(key);

    console.log(apiKey);

    if (!apiKey) {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                },
            },
        );
    } else {
        redis.del(key);
        return NextResponse.json(
            { key: apiKey },
            {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                },
            },
        );
    }
}
