/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './cfImgLoader.js',
    },
};

export default nextConfig;
