import { type NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
    // matcher: '/:lng*'
    matcher: [
        "/((?!api|_next/static|_next/image|img|favicon.ico|sw.js|sitemap.xml|98gas9mkeb.txt|robots.txt|og-homepage.png|appauth).*)",
    ],
};

export function middleware(req: NextRequest) {
    // i18n
    let lng;
    if (req.cookies.has(cookieName))
        lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    // 404ページ等のためにヘッダーを追加
    const headers = new Headers(req.headers);
    headers.set("x-locale", lng);

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) =>
            req.nextUrl.pathname
                .toLowerCase()
                .startsWith(`/${loc.toLowerCase()}`),
        ) &&
        !req.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(
                `/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`,
                req.url,
            ),
        );
    }

    if (req.headers.has("referer")) {
        const refererUrl = new URL(req.headers.get("referer") as string);
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        const response = NextResponse.next({ request: { headers } });
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next({ request: { headers } });
}
