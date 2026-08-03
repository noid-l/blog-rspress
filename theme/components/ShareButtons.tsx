import React, { useState } from 'react'

const SITE_URL = 'https://www.myls.top'

export const ShareButtons: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  const shareUrl = `${SITE_URL}${path}`
  const [showCopied, setShowCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch {
      // clipboard may be unavailable in some browsers
    }
  }

  return (
    <div className="blog-share">
      <span className="blog-share__label">分享</span>
      <button className="blog-share__btn" onClick={copyLink} title="复制链接">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        复制链接
      </button>
      <a className="blog-share__btn" href={weiboUrl} target="_blank" rel="noopener" title="分享到微博">微博</a>
      <a className="blog-share__btn" href={twitterUrl} target="_blank" rel="noopener" title="分享到 X">X</a>
      <button className="blog-share__btn" onClick={() => setShowQR(!showQR)} title="微信分享">微信</button>
      {showCopied && <span className="blog-share__label">已复制</span>}
      {showQR && (
        <div className="blog-qr-overlay" onClick={() => setShowQR(false)}>
          <div className="blog-qr-modal">
            <p>微信扫码分享</p>
            <img src={qrUrl} alt="QR Code" width="150" height="150" />
            <button className="blog-share__btn" onClick={() => setShowQR(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  )
}
