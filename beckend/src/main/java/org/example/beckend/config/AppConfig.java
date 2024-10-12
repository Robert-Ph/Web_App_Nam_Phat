package org.example.beckend.config;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.entity.enums.Permission;
import org.example.beckend.entity.enums.PositionName;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Company;
import org.example.beckend.entity.Position;
import org.example.beckend.repository.AccountRepository;
import org.example.beckend.repository.CompanyRepository;
import org.example.beckend.repository.PositionRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@Slf4j
public class AppConfig {
    //Init value for application first time run

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository, PositionRepository positionRepository, CompanyRepository companyRepository) {
        return arg -> {
            if (accountRepository.findByUsername("admin").isEmpty()) {

                //Init  user admin for system
                Account account = new Account();
                account.setUsername("admin");
                account.setPassword(new BCryptPasswordEncoder(10).encode("admin"));
                account.setPermission(Permission.ADMIN);
                account.setStatus(true);

                accountRepository.save(account);
                log.warn("Account admin is create with username: admin and password: admin");
            }

            if (companyRepository.findAll().isEmpty()) {
                companyRepository.save(Company
                        .builder()
                        .name("CÔNG TY TNHH THƯƠNG MẠI IN KỸ THUẬT NAM PHÁT")
                        .idTax("0317924032")
                        .phone("0904170472")
                        .address("168/17 đường Bình Trị Đông, P.Bình Trị Đông, Q.Bình Tân, TP.Hồ Chí Minh")
                        .build());
            }


            if (positionRepository.findAll().isEmpty()) {
                //Init postion if not exist
                positionRepository.save(Position.builder().name(PositionName.INTERN.name()).build());
                positionRepository.save(Position.builder().name(PositionName.OFFICIAL.name()).build());
            }
        };
    }
}
