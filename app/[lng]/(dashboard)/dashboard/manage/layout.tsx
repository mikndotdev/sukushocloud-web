"use client";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/app/components/shadcn/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { useRouter, usePathname } from "next/navigation";
import CookieConsent from "react-cookie-consent";

export default function PagesLayout({
    children,
}: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = () => {
        //@ts-ignore
        const pathSegments = pathname.split("/");
        if (pathSegments[1] === "en") {
            pathSegments[1] = "ja";
        } else if (pathSegments[1] === "ja") {
            pathSegments[1] = "en";
        }
        const newPath = pathSegments.join("/");
        router.push(newPath);
    };

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>

            <div className="mx-auto min-h-screen max-w-7xl px-4 py-24">
                {children}
                <CookieConsent
                    location="bottom"
                    buttonText="Yum! 🍪"
                    cookieName="CookieConsent"
                    style={{ background: "#6214d2" }}
                    buttonStyle={{
                        color: "#FFFFFF",
                        fontSize: "13px",
                        background: "#7c3aed",
                    }}
                    expires={150}
                >
                    We use cookies to enhance your experience. Would you like
                    some?
                </CookieConsent>
            </div>
        </>
    );
}
