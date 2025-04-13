import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        loader: "custom",
        loaderFile: "./cfImgLoader.ts",
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
