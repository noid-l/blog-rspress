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
      // fallback
    }
  }

  return (
    <div className="share-buttons">
      <span className="share-label">分享</span>
      <div className="share-actions">
        <button className="share-btn" onClick={copyLink} title="复制链接">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        </button>
        <a className="share-btn" href={weiboUrl} target="_blank" rel="noopener" title="分享到微博">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm-1.119-6.724c-2.385.336-3.947 2.034-3.496 3.797.46 1.763 2.68 2.834 5.055 2.509 2.378-.336 3.947-2.033 3.496-3.797-.459-1.762-2.679-2.843-5.055-2.509zm1.703 2.784c-.193.479-.759.727-1.262.553-.501-.174-.727-.683-.506-1.138.218-.45.746-.685 1.234-.523.494.164.727.625.534 1.108zm1.305-1.415c-.082.191-.312.289-.511.203-.197-.085-.287-.297-.196-.472.09-.176.314-.269.507-.185.194.083.283.292.2.454zm.878-3.735c-2.202-.668-4.691.221-5.453 2.155l.001.001c-.35.889.17 1.656.976 1.656.813 0 1.663-.649 2.322-1.231l-.006-.005c.451-.399 1.166-.784 1.791-.564.626.219.897.942.585 1.535-.313.595-1.054.858-1.676.654l-.006.005c-.451-.148-1.018.045-1.279.412-.262.366-.115.775.296.912 1.365.451 2.961-.255 3.564-1.584.604-1.326-.051-2.712-1.415-3.146z"/><path d="M20.5 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
        </a>
        <a className="share-btn" href={twitterUrl} target="_blank" rel="noopener" title="分享到 X">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button className="share-btn" onClick={() => setShowQR(!showQR)} title="微信分享">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.4c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
        </button>
      </div>
      {showCopied && <div className="share-toast">链接已复制</div>}
      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal">
            <p className="qr-title">微信扫码分享</p>
            <img src={qrUrl} alt="QR Code" width="150" height="150" />
            <button className="qr-close" onClick={() => setShowQR(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  )
}
