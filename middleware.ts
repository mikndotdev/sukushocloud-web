import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export const config = {
    // matcher: '/:lng*'
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|ads.txt|sw.js|sitemap.xml).*)",
    ],
};

export default createMiddleware(routing);
