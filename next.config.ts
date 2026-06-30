import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev-tools indicator (the "N" circle) so it
  // doesn't overlap the app's own floating chat button during `next dev`.
  // It never renders in a production build regardless.
  devIndicators: false,
};

export default nextConfig;
