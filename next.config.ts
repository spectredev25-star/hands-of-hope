
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js development indicator
  devIndicators: false,

  experimental: {
    agentFeedback: true,

    serverActions: {
      // Profile forms include an image (max 2 MB)
      // plus normal form fields.
      bodySizeLimit: "3mb",
    },
  },

  cacheComponents: true,

  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
