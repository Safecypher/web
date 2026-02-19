import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Set workspace root explicitly to suppress turbopack lockfile warning
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
