import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { CSPostHogProvider } from "@/app/components/posthog";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import "./globals.css";

const hsr = localFont({ src: "./fonts/HSR.woff2" });

export const metadata: Metadata = {
    title: "sukushocloud",
    description:
        "Upload, share, and manage your screenshots with the ultimate Screenshot Platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${hsr.className} antialiased`}>
                <CSPostHogProvider>
                    <SessionProvider>
                        <Toaster richColors />
                        {children}
                    </SessionProvider>
                </CSPostHogProvider>
            </body>
        </html>
    );
}
