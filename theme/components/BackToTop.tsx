import React, { useEffect, useState } from 'react'

/**
 * Floating scroll-to-top button. Wired via `globalUIComponents` in
 * `rspress.config.ts` so it appears on every page automatically.
 * Visibility toggles after one viewport height of scroll.
 * Default export is required by `globalUIComponents`.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!show) return null

  return (
    <button
      className="blog-back-to-top"
      onClick={scrollToTop}
      aria-label="回到顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
