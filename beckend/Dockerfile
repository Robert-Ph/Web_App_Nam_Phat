# Giai đoạn build ứng dụng
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Sao chép file cấu hình trước để tận dụng cache
COPY pom.xml ./
RUN mvn dependency:go-offline

# Sao chép source code vào container
COPY src ./src

# Biên dịch và đóng gói ứng dụng thành file WAR
RUN mvn clean package -DskipTests

# Giai đoạn chạy ứng dụng với Tomcat
FROM tomcat:11.0

# Đặt cổng Tomcat thành 8085
RUN sed -i 's/port="8080"/port="8085"/g' /usr/local/tomcat/conf/server.xml

WORKDIR /usr/local/tomcat/webapps/

# Sao chép file WAR từ bước build vào Tomcat
COPY --from=builder /app/target/*.war ./ROOT.war

# Mở cổng 8085 để truy cập Tomcat
EXPOSE 8085

CMD ["catalina.sh", "run"]
