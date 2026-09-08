import './index.css'
import {
  Layout as OriginalLayout,
  DocLayout as OriginalDocLayout,
  type DocLayoutProps,
} from '@rspress/core/theme-original'
import { PostHeader } from './components/PostHeader'
import { PostNav } from './components/PostNav'

export * from '@rspress/core/theme-original'

export function Layout() {
  return <OriginalLayout afterDocContent={<PostNav />} />
}

export function DocLayout(props: DocLayoutProps) {
  return (
    <OriginalDocLayout
      {...props}
      beforeDocContent={
        <>
          <PostHeader />
          {props.beforeDocContent}
        </>
      }
    />
  )
}

export { HomeLayout } from './components/HomeLayout'
export { PostsLayout } from './components/PostsLayout'
export { TagsLayout } from './components/TagsLayout'
export { AboutLayout } from './components/AboutLayout'
