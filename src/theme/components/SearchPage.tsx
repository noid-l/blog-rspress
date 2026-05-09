import React, { useEffect, useRef, useState } from 'react'

type SearchStatus = 'idle' | 'ready' | 'unsupported' | 'error'

export const SearchPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setStatus('unsupported')
      return
    }

    const ensureStylesheet = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.append(link)
    }

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
        if (existing) {
          if (existing.dataset.loaded === 'true') {
            resolve()
            return
          }
          existing.addEventListener('load', () => resolve(), { once: true })
          existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
          return
        }

        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.addEventListener('load', () => {
          script.dataset.loaded = 'true'
          resolve()
        }, { once: true })
        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
        document.body.append(script)
      })
    }

    const init = async () => {
      try {
        ensureStylesheet('/pagefind/pagefind-ui.css')
        await loadScript('/pagefind/pagefind-ui.js')

        const PagefindUI = (window as any).PagefindUI
        if (!containerRef.current || !PagefindUI) {
          throw new Error('Pagefind UI runtime unavailable')
        }

        new PagefindUI({
          element: containerRef.current,
          showImages: false,
          showSubResults: true,
          resetStyles: false,
          translations: {
            placeholder: '搜索文章内容、标题或标签',
          },
        })

        setStatus('ready')
      } catch (error) {
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : '未知错误')
      }
    }

    init()
  }, [])

  return (
    <div className="home-shell">
      <section className="feature-panel mt-6 md:mt-8">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">站内搜索</h2>
            <p className="panel-copy">试试搜索 `VitePress`、`Obsidian`、`IPv6` 这类关键词。</p>
          </div>
        </div>
        <div className="mt-6">
          <div ref={containerRef} className="pagefind-shell" />
          {status === 'unsupported' && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              开发模式下不生成 Pagefind 索引，请先执行 `npm run build` 后再预览搜索效果。
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400">
              搜索资源加载失败：{errorMessage}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
