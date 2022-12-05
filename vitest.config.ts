import { defineConfig } from 'vitest/config'
import vue from "@vitejs/plugin-vue"
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
  test: {
    clearMocks: true,
    coverage: {
      provider: "c8"
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
})