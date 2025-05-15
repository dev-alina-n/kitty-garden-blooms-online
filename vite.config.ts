import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/gigachat': {
        target: 'https://gigachat.devices.sberbank.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gigachat/, ''),
        secure: false
      },
      '/api/auth': {
        target: 'https://ngw.devices.sberbank.ru:9443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ''),
        secure: false
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
