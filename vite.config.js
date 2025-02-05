import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8444, 
    host: '0.0.0.0',
    open: true, 
    https: {
      key: fs.readFileSync("./sert/key.txt"), 
      cert: fs.readFileSync("./sert/sv_en_ru_2025_07_27.crt"),
    }
  }
})
