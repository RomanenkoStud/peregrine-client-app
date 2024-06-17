/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.externals = [...config.externals, '@tensorflow/tfjs-node'];
    return config;
  }
};

export default nextConfig;
