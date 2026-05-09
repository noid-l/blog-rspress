import React from 'react'

const SITE_URL = 'https://www.myls.top'

export const PostFooter: React.FC<{ path: string }> = ({ path }) => {
  const fullUrl = `${SITE_URL}${path}`

  return (
    <div className="post-footer">
      <p>
        本文采用
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>
        许可协议发布，转载请注明出处。
      </p>
      <p>原文链接：<a href={fullUrl}>{fullUrl}</a></p>
      <div className="post-footer-badges">
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">
          <img src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg" alt="CC BY-SA 4.0" />
        </a>
      </div>
    </div>
  )
}
