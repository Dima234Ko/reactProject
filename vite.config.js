import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9444,
    host: '0.0.0.0',
    open: true,
    https: {
      key: fs.readFileSync('./sert/key.txt'),
      cert: fs.readFileSync('./sert/sv_en_ru_2025_07_27.crt'),
    },
  },
  preview: {
    port: 9444, // Порт для vite preview
    host: '0.0.0.0',
    open: true,
    https: {
      key: fs.readFileSync('./sert/key.txt'),
      cert: fs.readFileSync('./sert/sv_en_ru_2025_07_27.crt'),
    },
    // hmr: {
    //   host: 'r1.sv-en.ru',
    //   port: 8444,
    //   protocol: 'wss',
    // },
  },
});
