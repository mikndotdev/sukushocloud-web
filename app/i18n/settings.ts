export const fallbackLng = "en";
export const languages = [fallbackLng, "ja"];
export const defaultNS = "common";
export const cookieName = "language";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
