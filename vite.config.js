import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      plugins: [
        {
          name: 'copy-ads',
          writeBundle() {
            // Copy ads folder to dist
            const sourceDir = 'assets/images/ads'
            const targetDir = 'dist/assets/images/ads'

            if (existsSync(sourceDir)) {
              mkdirSync(targetDir, { recursive: true })

              const files = readdirSync(sourceDir)
              files.forEach(file => {
                copyFileSync(join(sourceDir, file), join(targetDir, file))
                console.log(`Copied: ${file}`)
              })
            }
          }
        }
      ]
    }
  },
  server: {
    port: 3000,
    open: true
  },
  base: './'
})