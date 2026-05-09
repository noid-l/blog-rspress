import React from 'react'

export interface PostCardProps {
  title: string
  url: string
  date: string
  description?: string
  tags?: string[]
  readingTime?: number
  category?: string
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  url,
  date,
  description,
  tags,
  readingTime,
  category,
}) => {
  return (
    <a href={url} className="post-card">
      <h3 className="post-card-title">{title}</h3>
      <div className="post-card-meta">
        {category && <span className="category-chip">{category}</span>}
        {date}
        {readingTime ? ` · ${readingTime} 分钟` : ''}
      </div>
      {description && <p className="post-card-desc">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  )
}
