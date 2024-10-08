package org.example.beckend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BeckendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeckendApplication.class, args);
    }

}
