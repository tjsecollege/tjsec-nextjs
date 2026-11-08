/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pages read their content from WordPress (lib/wordpress.js), which retries a
  // busy server for up to ~85s per request before using its last good copy —
  // allow for that instead of Next's default 60s.
  staticPageGenerationTimeout: 180,
  experimental: {
    // If a page still fails to build (e.g. the WordPress host was overloaded),
    // try that page again after a short wait instead of failing the build.
    staticGenerationRetryCount: 3,
  },
};

export default nextConfig;
