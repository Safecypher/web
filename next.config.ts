import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  webpack: (config) => {
    // ~/package.json exists and makes webpack treat the home directory as the
    // workspace root, causing bare-specifier CSS imports (e.g. @import "tailwindcss")
    // to be resolved from the wrong node_modules. Explicitly anchor module
    // resolution to this project's node_modules so webpack finds packages here
    // before traversing up past the project boundary.
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ]
    return config
  },
}

export default nextConfig
