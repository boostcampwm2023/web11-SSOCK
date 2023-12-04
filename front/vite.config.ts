import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host: '0.0.0.0',
    https: true,
    proxy: {
      '/api': {
        target: `https://www.mysnowball.kr/api`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@mock': '/src/mockdata.json'
    }
  }
});
