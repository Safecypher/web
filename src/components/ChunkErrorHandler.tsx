'use client'

import { useEffect } from 'react'

/**
 * Catches ChunkLoadError — the "404 on JS chunk after a new Netlify deploy" problem.
 * Next.js SPA navigation references chunk hashes baked into the current page. When a
 * new atomic deploy replaces the site, those hashes no longer exist. A reload fetches
 * the fresh HTML + manifest and resolves the error.
 */
export function ChunkErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.name === 'ChunkLoadError') {
        window.location.reload()
      }
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
  return null
}
