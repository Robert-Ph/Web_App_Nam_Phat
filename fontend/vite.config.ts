import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ bên ngoài
    port: 5175, // Đổi port nếu cần
    cors: true,
    // hmr: {
    //   protocol: "wss",
    //   host: "namphatmanager.candctp.com",
    //   port: 443,
    // }

  },
  preview: {
    port: 5175,
    host: '0.0.0.0',
  },
})
