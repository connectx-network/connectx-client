/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    headers() {
      return [
        {
          source: "/public/.well-known/apple-app-site-association",
          headers: [{ key: "content-type", value: "application/json" }],
        },
      ];
    },
  },
};

export default nextConfig;
