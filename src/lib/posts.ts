import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const POSTS_DIR = resolve(process.cwd(), 'docs/posts')

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  date: z.union([z.string(), z.date()]).transform((val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10)
    return val
  }),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  cover: z.string().optional(),
  category: z.string().optional(),
  draft: z.boolean().optional().default(false),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>

export interface PostItem {
  title: string
  url: string
  date: string
  tags: string[]
  description: string
  readingTime: number
  cover?: string
  category?: string
  draft?: boolean
}

function formatDate(date: string): string {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

export function getReadingTime(content: string, wordsPerMinute = 400): number {
  let text = content
  text = text.replace(/^---[\s\S]*?---/, '')
  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/`[^`]+`/g, '')
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  text = text.replace(/<[^>]+>/g, '')
  text = text.replace(/^[#>*_-]+\s*/gm, '')
  text = text.replace(/\s+/g, '')
  return Math.max(1, Math.ceil(text.length / wordsPerMinute))
}

export function loadPosts(): PostItem[] {
  const files = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')

  const posts: PostItem[] = []

  for (const file of files) {
    const filepath = join(POSTS_DIR, file)
    const raw = readFileSync(filepath, 'utf-8')
    const { data, content } = matter(raw)

    if (!data.date) continue

    try {
      const validated = PostFrontmatterSchema.parse(data)
      if (validated.draft) continue

      const slug = file.replace(/\.md$/, '')
      posts.push({
        title: validated.title,
        url: `/posts/${slug}`,
        date: formatDate(validated.date),
        tags: validated.tags,
        description: validated.description ?? '',
        readingTime: getReadingTime(content),
        cover: validated.cover,
        category: validated.category,
        draft: validated.draft,
      })
    } catch (error) {
      console.warn(`Invalid frontmatter for post ${file}:`, error)
    }
  }

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function loadPostBySlug(slug: string): PostItem | null {
  const posts = loadPosts()
  return posts.find((p) => p.url === `/posts/${slug}`) ?? null
}
