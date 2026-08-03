import React from 'react'

const SITE_URL = 'https://www.myls.top'

/**
 * License + canonical URL footer for each post. Rendered in the
 * `afterDocContent` Layout slot.
 */
export const PostFooter: React.FC<{ path: string }> = ({ path }) => {
  const fullUrl = `${SITE_URL}${path}`

  return (
    <div className="blog-post-footer">
      <span>
        本文采用
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"> CC BY-SA 4.0 </a>
        许可协议发布
      </span>
      <span>
        原文链接：
        <a href={fullUrl}>{fullUrl}</a>
      </span>
    </div>
  )
}
