/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: ["pbs.twimg.com"],
  },
  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //     }
  //     return config;
  // },
};

export default nextConfig;
