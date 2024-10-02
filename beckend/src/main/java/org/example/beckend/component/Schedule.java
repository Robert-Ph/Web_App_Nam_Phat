package org.example.beckend.component;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Slf4j
@Component
public class Schedule {


    private final  LogService logService;

    @Autowired
    public Schedule(LogService logService){
        this.logService = logService;
    }


    @Async
    @Scheduled(cron = "0 0 2 * * ?")
//    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void deleteOldLogs() {
        log.warn("Delete");
        LocalDateTime localDateTime = LocalDateTime.now().minusDays(30);
        log.warn(localDateTime.toString());
        logService.deleteByDateCreateBefore(localDateTime);

    }
}
