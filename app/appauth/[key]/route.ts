export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { auth, signIn } from "@/auth";
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

async function encryptData(data: string, key: CryptoKey): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );

    // Combine IV and encrypted data
    const combinedData = new Uint8Array(iv.length + encryptedData.byteLength);
    combinedData.set(iv);
    combinedData.set(new Uint8Array(encryptedData), iv.length);

    return combinedData.buffer;
}

async function getKeyFromPassword(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("salt"), // Use a proper salt in production
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
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

            const encryptionKey = await getKeyFromPassword(key);
            const encryptedApiKey = await encryptData(apiKey, encryptionKey);

            await redis.set(key, Buffer.from(encryptedApiKey).toString('base64'), { ex: 60 * 5 });

            return NextResponse.redirect(`https://sukusho.cloud/appauth/success`);
        } catch (e) {
            return NextResponse.json(e, { status: 500 });
        }
    }
}