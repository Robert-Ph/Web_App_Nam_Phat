FROM node:20-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép tệp package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép toàn bộ thư mục dự án vào thư mục làm việc
COPY . .

# Mở cổng ứng dụng
EXPOSE 5175

# Khởi động ứng dụng
CMD ["npm", "run", "dev"]
