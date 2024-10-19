/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './cfImgLoader.ts',
    },
};

export default nextConfig;
