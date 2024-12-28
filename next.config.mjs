/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable SWC minification as a temporary workaround
  swcMinify: false,

  // Ensure compatibility mode for older setups (if needed)
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
