/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "pbs.twimg.com",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname,
      //   pathname: "**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "dev-api.edapt.me",
      //   pathname: "**",
      // },
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
