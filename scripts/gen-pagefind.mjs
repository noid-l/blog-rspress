import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const EXCLUDE_SELECTORS = 'header,.rspress-nav,.rspress-footer,.rspress-footer *,img[alt="公安备案"]'

export function generatePagefind(outDir) {
  try {
    execFileSync('pagefind', [
      '--site', outDir,
      '--output-path', resolve(outDir, 'pagefind'),
      '--exclude-selectors', EXCLUDE_SELECTORS,
    ], { stdio: 'inherit' })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('❌ Pagefind index generation failed:', message)
    throw new Error(`Pagefind indexing failed: ${message}`)
  }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePagefind('doc_build')
}
