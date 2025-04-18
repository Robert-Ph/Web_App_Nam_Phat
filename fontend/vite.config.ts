import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ bên ngoài
    port: 5175, // Đổi port nếu cần
    cors: true,

  },
  preview: {
    port: 5175,
    host: '0.0.0.0',
  },
  // build: {
  //   outDir: 'dist', // Chỉ định thư mục output
  //   emptyOutDir: true, // Xóa nội dung cũ trước khi build mới
  // }
})
