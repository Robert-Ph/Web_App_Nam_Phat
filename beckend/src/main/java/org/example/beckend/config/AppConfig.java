package org.example.beckend.config;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.contains.Permission;
import org.example.beckend.contains.PositionName;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Employee;
import org.example.beckend.entity.Position;
import org.example.beckend.repository.AccountRepository;
import org.example.beckend.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@Slf4j
public class AppConfig {


    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository, PositionRepository positionRepository) {
        return arg -> {
            if (accountRepository.findByUsername("admin").isEmpty()) {

                //Init  user admin for system
                Account account = new Account();
                account.setUsername("admin");
                account.setPassword(new BCryptPasswordEncoder(10).encode("admin"));
                account.setPermission(Permission.ADMIN.name());
                account.setStatus(true);

                accountRepository.save(account);
                log.warn("Account admin is create with username: admin and password: admin");
            }
            if (positionRepository.findAll().isEmpty()) {
                //Init postion if not exist
                positionRepository.save(Position.builder().name(PositionName.INTERN.name()).build());
                positionRepository.save(Position.builder().name(PositionName.OFFICIAL.name()).build());
            }
        };
    }
}