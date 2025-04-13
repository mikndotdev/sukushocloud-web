import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const hsr = localFont({ src: "./fonts/HSR.woff2" });

export const metadata: Metadata = {
    title: "sukushocloud",
    description:
        "Upload, share, and manage your screenshots with the ultimate Screenshot Platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
