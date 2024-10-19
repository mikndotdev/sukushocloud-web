import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const hsr = localFont({ src: "./fonts/HSR.woff2" });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${hsr.className} antialiased`}>{children}</body>
            <script defer src="https://analytics.mikandev.com/script.js" data-website-id="2bc3e16e-558d-43ef-a7a3-dafd1fb59dd3"/>
        </html>
    );
}
