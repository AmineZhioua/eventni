import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
