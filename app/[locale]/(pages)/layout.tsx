import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { CSPostHogProvider } from "@/app/components/posthog";
import { Toaster } from "sonner";
import { Noto_Sans_JP } from "next/font/google";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";

const font = Noto_Sans_JP({
    weight: "800",
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
    title: "sukushocloud",
    description:
        "Upload, share, and manage your screenshots with the ultimate Screenshot Platform.",
};

interface LocaleLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    return (
        <html className={`${font.className} antialiased`} lang={locale}>
            <body>
                <NextIntlClientProvider>
                    <CSPostHogProvider>
                        <SessionProvider>
                            <Toaster richColors />
                            {children}
                        </SessionProvider>
                    </CSPostHogProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
