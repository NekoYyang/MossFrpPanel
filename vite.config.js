import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Components({
    resolvers: [VantResolver()],
  })],
  server: {
    proxy: {
      "/api": {
        target: 'http://public.ghs.wiki:7001/API',
        changeOrigin: true,
        secure: false,
        headers: {                  
          Referer: 'Unknown'
        }
      }
    }
  }
  
})


