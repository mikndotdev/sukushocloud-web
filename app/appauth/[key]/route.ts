export const runtime = "edge";
import { type NextRequest, NextResponse } from "next/server";
import { auth, signIn } from "@/auth";
import { Redis } from '@upstash/redis/cloudflare'
import { importJWK, CompactEncrypt } from 'jose';

const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_KEY,
})

interface Props {
    params: {
        key: string;
    };
}

async function encryptData(data: string, clientKey: JsonWebKey): Promise<string> {
    const importedKey = await importJWK(clientKey, 'RSA-OAEP');

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const jwe = await new CompactEncrypt(encodedData)
        .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
        .encrypt(importedKey);

    return jwe;
}

export async function GET(req: NextRequest) {
    // Extract the key from the URL
    const url = new URL(req.url);
    const encodedKey = url.pathname.split('/').pop();

    if (!encodedKey) {
        return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    }

    // Decode the key
    const clientKey: JsonWebKey = JSON.parse(decodeURIComponent(encodedKey));

    const session = await auth();

    if (!session) {
        await signIn("logto");
    }

    if (session) {
        try {
            const backendRes = await fetch(
                `https://manager.sukusho.cloud/getInfo?id=${session.user.id}&key=${process.env.BACKEND_SIGNING_KEY}`
            );

            const data = await backendRes.json();
            const apiKey = data.apiKey;

            const encryptedApiKey = await encryptData(apiKey, clientKey);

            // Store the encrypted API key in Redis with the client's key
            await redis.set(encodedKey, encryptedApiKey, { ex: 60 * 5 });

            return NextResponse.redirect(`https://sukusho.cloud/auth/success`);
        } catch (e) {
            console.error(e);
            return NextResponse.json({ e }, { status: 500 });
        }
    }
}