import { rmSync } from 'node:fs'

const targets = [
  'node_modules/@rspress/theme-default/node_modules/react-helmet-async',
  'node_modules/@rspress/runtime/node_modules/react-helmet-async',
]

for (const target of targets) {
  try {
    rmSync(target, { recursive: true, force: true })
    console.log(`Removed: ${target}`)
  } catch {
    // ignore
  }
}
