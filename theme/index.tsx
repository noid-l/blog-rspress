import './index.css'
import { Layout as OriginalLayout } from '@rspress/core/theme-original'
import { BodyClass } from './components/BodyClass'
import { InPostExtras } from './components/InPostExtras'

/**
 * Theme entry. Re-exports the default Rspress theme and overrides the
 * `Layout` component to:
 *   - inject `top={<BodyClass />}` so route-scoped CSS can target the
 *     current page (e.g. `body.route-about .rspress-doc ...`)
 *   - inject `afterDocContent={<InPostExtras />}` for the in-post share,
 *     prev/next nav, and license footer
 *   - re-export the ejected `HomeLayout`, `PostsLayout`, `TagsLayout`
 *     components as named exports so Rspress picks them up
 */
export * from '@rspress/core/theme-original'

export function Layout() {
  return (
    <OriginalLayout
      top={<BodyClass />}
      afterDocContent={<InPostExtras />}
    />
  )
}

export { HomeLayout } from './components/HomeLayout'
export { PostsLayout } from './components/PostsLayout'
export { TagsLayout } from './components/TagsLayout'
