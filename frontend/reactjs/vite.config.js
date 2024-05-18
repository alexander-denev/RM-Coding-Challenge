import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsConfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsConfigPaths()],
})
