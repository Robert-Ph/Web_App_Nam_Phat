# Sử dụng Node 20 với Alpine để tạo image nhẹ
FROM node:20-alpine

# Cài đặt một số gói cần thiết cho debug hoặc native module nếu cần
RUN apk add --no-cache bash

# Đặt thư mục làm việc
WORKDIR /app

# Copy riêng package.json và lockfile để tận dụng cache khi dependencies không đổi
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn dự án
COPY . .

## Cấu hình biến môi trường nếu cần (có thể sửa hoặc thêm ARG nếu cần sau này)
#ENV HOST=0.0.0.0 \
#    PORT=5175

# Mở cổng cho dev server (Vite hoặc tương tự)
EXPOSE 5175

# Lệnh mặc định để chạy dev server
CMD ["npm", "run", "dev"]
