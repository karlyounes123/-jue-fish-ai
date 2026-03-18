/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase body size limit for image uploads (10MB)
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["@anthropic-ai/sdk"],
  },
};

export default nextConfig;
