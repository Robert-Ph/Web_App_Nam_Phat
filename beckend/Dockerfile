# Bước 1: Chọn image chứa JDK để build ứng dụng
FROM eclipse-temurin:17-jdk-alpine as build

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép pom.xml và các tệp cấu hình cần thiết
COPY pom.xml .
COPY src ./src

# Xây dựng ứng dụng
RUN mvn clean package -DskipTests

# Bước 2: Chọn image chạy ứng dụng
FROM openjdk:17-jdk-slim

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép tệp JAR từ bước build vào thư mục làm việc
COPY --from=builder /app/target/your-application.jar app.jar



# Expose the application port
EXPOSE 8088

# Run the application using the specific JAR
ENTRYPOINT ["java","-jar","/app/NamPhatManagement-0.0.1-SNAPSHOT.jar"]
