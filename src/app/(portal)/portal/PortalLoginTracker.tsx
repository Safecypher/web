'use client'

import { useEffect } from 'react'
import { firePortalLogin } from '@/app/actions/attio'
import { createClient } from '@/lib/supabase/client'

export function PortalLoginTracker() {
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        firePortalLogin(data.user.email)
      }
    })
  }, [])
  return null
}
