import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: parseInt(env.PORT || '5173')
    },
    define: {
      __API_PORT__: JSON.stringify(env.VITE_API_PORT || '8000')
    }
  };
});