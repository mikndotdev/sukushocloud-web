"use client";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/app/components/shadcn/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { useRouter, usePathname } from "next/navigation";
import CookieConsent from "react-cookie-consent";

interface Props {
    params: {
        lng: string;
    };
    children: React.ReactNode;
}

export default function PagesLayout({ params: { lng }, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <SidebarProvider>
                <AppSidebar params={{ lng }} />
                <main>
                    <SidebarTrigger className="text-white bg-inherit hover:bg-primary hover:text-white" />
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
