import React from 'react'

const FOCUS_AREAS = [
  { icon: '🤖', title: 'AI 编码工作流', desc: '用 AI 工具提升编码与交付效率' },
  { icon: '⚙️', title: '全栈与工程化', desc: 'Spring Boot / Vue / 前端工程化实践' },
  { icon: '🚀', title: '自动化部署', desc: 'CI/CD 与发布流程自动化' },
  { icon: '🏢', title: '企业项目落地', desc: '从需求到上线的实战经验' },
]

const BLOG_STACK = [
  { name: 'Obsidian', role: '写作' },
  { name: 'AI', role: '辅助创作与改稿' },
  { name: 'Rspress', role: '构建' },
  { name: 'ESA Pages', role: '部署' },
]

/**
 * About page layout, rendered from `docs/about.mdx` (`pageType: custom`).
 * Presentational only — content lives in this component.
 */
export const AboutLayout: React.FC = () => {
  return (
    <div className="bl-shell">
      <section className="bl-hero">
        <h1 className="bl-hero__name">关于</h1>
        <p className="bl-hero__tagline">
          我是一个偏工程实践路线的开发者，喜欢把工具链和流程打磨顺畅，让想法更快落地。
        </p>
      </section>

      <section className="bl-section">
        <div className="bl-section__head">
          <h2 className="bl-section__title">关注方向</h2>
        </div>
        <div className="bl-grid">
          {FOCUS_AREAS.map((area) => (
            <div key={area.title} className="bl-about-card">
              <span className="bl-about-card__icon" aria-hidden="true">
                {area.icon}
              </span>
              <h3 className="bl-about-card__title">{area.title}</h3>
              <p className="bl-about-card__desc">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bl-section">
        <div className="bl-section__head">
          <h2 className="bl-section__title">这个博客</h2>
        </div>
        <div className="bl-about-flow">
          {BLOG_STACK.map((item) => (
            <div key={item.name} className="bl-about-flow__item">
              <span className="bl-about-flow__name">{item.name}</span>
              <span className="bl-about-flow__role">{item.role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bl-section">
        <div className="bl-section__head">
          <h2 className="bl-section__title">联系</h2>
        </div>
        <div className="bl-about-links">
          <a
            href="https://github.com/noid-l"
            target="_blank"
            rel="noopener noreferrer"
            className="bl-about-link"
          >
            <span className="bl-about-link__label">GitHub</span>
            <span className="bl-about-link__value">@noid-l</span>
          </a>
        </div>
      </section>
    </div>
  )
}
