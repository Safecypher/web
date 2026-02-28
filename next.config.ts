import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Set workspace root explicitly to suppress turbopack lockfile warning
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Prevent Turbopack from bundling Node.js-only packages used by @tailwindcss/node
  // These must be loaded as native Node.js externals, not evaluated in the browser context
  serverExternalPackages: ['enhanced-resolve', '@tailwindcss/node'],
}

export default nextConfig
