/**
 * Plain JS config (not .ts): this Next build's TypeScript-config loader
 * stalls on a cold start, so we avoid the compile step entirely.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Hide the floating Next.js dev-tools indicator (the "N" circle) so it
  // doesn't overlap the app's own floating chat button. Dev-only; never
  // renders in production. (Valid per node_modules/next/dist/docs.)
  devIndicators: false,
};

export default nextConfig;
