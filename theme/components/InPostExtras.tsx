import React from 'react'
import { useLocation } from '@rspress/core/runtime'
import { PostNav } from './PostNav'
import { PostFooter } from './PostFooter'
import { ShareButtons } from './ShareButtons'

/**
 * Wrapper for the `afterDocContent` Layout slot. Reads the current URL
 * via `useLocation()` (re-exported from `react-router-dom`) and renders
 * ShareButtons / PostNav / PostFooter below the doc body. Skipped for
 * non-post pages (home/tags/about) by checking the pathname.
 *
 * `usePage()` is NOT used here because Layout slots render outside the
 * page context, so `usePage()` returns an empty object.
 */
export const InPostExtras: React.FC = () => {
  const { pathname } = useLocation()
  // Map pathname → routePath shape (e.g. "/posts/foo" → "/posts/foo")
  const routePath = pathname
  // Derive a title from the slug (human-friendly default)
  const title = routePath
    .replace(/^\/posts\//, '')
    .replace(/[-_]/g, ' ')
    .replace(/\/$/, '')

  if (!routePath.startsWith('/posts/') || routePath === '/posts/' || routePath === '/posts') {
    return null
  }

  const slug = routePath.replace(/^\/posts\//, '').replace(/\/$/, '')

  return (
    <div className="blog-after-doc">
      <ShareButtons path={routePath} title={title} />
      <PostNav slug={slug} />
      <PostFooter path={routePath} />
    </div>
  )
}
