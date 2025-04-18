package org.example.backend.component;

import org.example.backend.service.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


//@Slf4j
@Component
public class Schedule {


    private static final Logger log = LoggerFactory.getLogger(Schedule.class);

    private final  LogService logService;

    @Autowired
    public Schedule(LogService logService){
        this.logService = logService;
    }


    @Async
    @Scheduled(cron = "0 0 2 * * ?")
    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void deleteOldLogs() {
        log.warn("Delete");
        LocalDateTime localDateTime = LocalDateTime.now().minusDays(30);
        log.warn(localDateTime.toString());
        logService.deleteByDateCreateBefore(localDateTime);

    }
}
