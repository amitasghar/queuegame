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
          name: 'copy-assets',
          writeBundle() {
            // Copy ads folder to dist
            const adsSourceDir = 'assets/images/ads'
            const adsTargetDir = 'dist/assets/images/ads'

            if (existsSync(adsSourceDir)) {
              mkdirSync(adsTargetDir, { recursive: true })

              const adsFiles = readdirSync(adsSourceDir)
              adsFiles.forEach(file => {
                copyFileSync(join(adsSourceDir, file), join(adsTargetDir, file))
                console.log(`Copied ad: ${file}`)
              })
            }

            // Copy sounds folder to dist
            const soundsSourceDir = 'assets/sounds'
            const soundsTargetDir = 'dist/assets/sounds'

            if (existsSync(soundsSourceDir)) {
              mkdirSync(soundsTargetDir, { recursive: true })

              const soundFiles = readdirSync(soundsSourceDir)
              soundFiles.forEach(file => {
                copyFileSync(join(soundsSourceDir, file), join(soundsTargetDir, file))
                console.log(`Copied sound: ${file}`)
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