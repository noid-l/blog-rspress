import './index.css'
import { Layout as OriginalLayout } from '@rspress/core/theme-original'
import { PostNav } from './components/PostNav'

export * from '@rspress/core/theme-original'

export function Layout() {
  return <OriginalLayout afterDocContent={<PostNav />} />
}

export { HomeLayout } from './components/HomeLayout'
export { PostsLayout } from './components/PostsLayout'
export { TagsLayout } from './components/TagsLayout'
