'use client'

import { useEffect } from 'react'
import { fireMockupViewed } from '@/app/actions/attio'
import { createClient } from '@/lib/supabase/client'

export function DemoPageTracker() {
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      fireMockupViewed(data.user?.email ?? undefined)
    })
  }, [])
  return null
}
