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
    <a href={url} className="bl-post-card">
      <div className="bl-post-card__meta">
        {category && <span className="bl-category">{category}</span>}
        <span>{date}</span>
        {readingTime ? <span>· {readingTime} 分钟</span> : null}
      </div>
      <h3 className="bl-post-card__title">{title}</h3>
      {description && <p className="bl-post-card__desc">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="bl-post-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="bl-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  )
}
