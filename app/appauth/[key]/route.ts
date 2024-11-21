import { type NextRequest, NextResponse } from "next/server";
import { auth, signIn } from "@/auth";
import { Redis } from '@upstash/redis'
import { generateKeyPair, exportJWK, importJWK, CompactEncrypt } from 'jose';

const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_KEY,
})

interface Props {
    params: {
        key: string;
    };
}

async function encryptData(data: string, key: string): Promise<string> {
    const { publicKey } = await generateKeyPair('RSA-OAEP');
    const jwk = await exportJWK(publicKey);
    const importedKey = await importJWK(jwk, 'RSA-OAEP');

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const jwe = await new CompactEncrypt(encodedData)
        .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
        .encrypt(importedKey);

    return jwe;
}

export async function GET(req: NextRequest, key: string) {
    const session = await auth();

    if (!session) {
        await signIn("logto")
    }

    if (session) {
        try {
            const backendRes = await fetch(
                `https://manager.sukusho.cloud/getInfo?id=${session.user.id}&key=${process.env.BACKEND_SIGNING_KEY}`,
            );

            const data = await backendRes.json();
            const apiKey = data.apiKey;

            const encryptedApiKey = await encryptData(apiKey, key);

            await redis.set(key, encryptedApiKey, { ex: 60 * 5 });

            return NextResponse.redirect(`https://sukusho.cloud/auth/success`);
        } catch (e) {
            return NextResponse.json(e, { status: 500 });
        }
    }
}