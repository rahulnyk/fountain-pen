/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["faiss-node"],
    },
    output: "standalone",
    webpack: (config) => {
        config.externals = [...config.externals, "hnswlib-node"];
        return config;
    },
};

export default nextConfig;
