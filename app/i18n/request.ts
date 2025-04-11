import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { loadI18nTranslations } from "next-intl-split/load";
import { routing } from "@/app/i18n/routing";

// Can be imported from a shared config
const locales = ["en", "ja"];

export default getRequestConfig(async ({ requestLocale }) => {
    // Validate that the incoming `locale` parameter is valid
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // The provided route should starts from the src folder with the Relative approach.
    const messages = loadI18nTranslations("./i18n/locales/", locale, true);

    return {
        locale,
        messages,
    };
});
