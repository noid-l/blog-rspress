import React, { useEffect, useState } from 'react'

export const BackToTop: React.FC = () => {
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
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="回到顶部"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 99,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'var(--bg-soft)',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        color: 'var(--text-2)',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
