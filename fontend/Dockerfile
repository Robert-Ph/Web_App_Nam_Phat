# Sử dụng hình ảnh chính thức của Node.js với phiên bản 20 trên Alpine Linux
FROM node:20-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Xóa thư mục node_modules và file package-lock.json nếu có
RUN rm -rf node_modules package-lock.json

# Sao chép tệp package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt lại các phụ thuộc của ứng dụng
RUN npm install

# Cài đặt Rollup trực tiếp
RUN npm install rollup

# Sao chép toàn bộ dự án vào thư mục làm việc
COPY . .

# Mở cổng ứng dụng
EXPOSE 5175

# Khởi động ứng dụng
CMD ["npm", "run", "dev"]
