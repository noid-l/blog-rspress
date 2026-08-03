import { useEffect } from 'react'
import { useLocation } from '@rspress/core/runtime'

/**
 * Sets `document.body.className` to `route-<slug>` based on the current path,
 * enabling route-scoped CSS rules (e.g. `body.route-about .rspress-doc ...`).
 * Rendered as a Layout top slot; renders nothing.
 */
export function BodyClass(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    const slug = pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'
    document.body.className = `route-${slug}`
  }, [pathname])

  return null
}
