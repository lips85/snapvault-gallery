/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tmvxieavvyojdqcuxoog.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
