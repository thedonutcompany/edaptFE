/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "**",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //     }
  //     return config;
  // },
};

export default nextConfig;
