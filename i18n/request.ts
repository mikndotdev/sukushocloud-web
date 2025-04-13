import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    if (process.env.NODE_ENV === "development") {
        const res = await fetch(
            `${process.env.TOLGEE_API_URL}/v2/projects/${process.env.TOLGEE_PROJECT_ID}/translations/${locale}`,
            {
                headers: {
                    "x-api-key": `${process.env.TOLGEE_API_KEY}`,
                },
            },
        );
        const data = await res.json();
        const messages = data[locale];

        return {
            locale,
            messages,
        };
    }

    const res = await fetch(`${process.env.I18N_PUBLIC_URL}/${locale}.json`);

    return {
        locale,
        messages: await res.json(),
    };
});
