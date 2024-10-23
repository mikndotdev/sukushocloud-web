"use client";
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/app/components/shadcn/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { IoIosMenu } from "react-icons/io";

interface Props {
    params: {
        lng: string;
    };
    children: React.ReactNode;
}

export default function PagesLayout({ params: { lng }, children }: Props) {
    return (
        <>
            <SidebarProvider>
                <div className="grid grid-cols-[auto,1fr] h-screen">
                    <AppSidebar params={{ lng }} />
                    <main className="flex flex-col items-center justify-center">
                        <SidebarInset className="ml-0 md:ml-10 bg-inherit">
                            <SidebarTrigger className="text-white bg-inherit hover:bg-primary hover:text-white ml-10 md:ml-0 mt-5 mb-5" />
                            {children}
                        </SidebarInset>
                    </main>
                </div>
            </SidebarProvider>
        </>
    );
}