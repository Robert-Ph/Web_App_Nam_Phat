package org.example.beckend.service;

import org.example.beckend.contains.LogLevel;
import org.example.beckend.dto.response.AccountResponse;
import org.example.beckend.dto.response.LogResponse;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Log;
import org.example.beckend.repository.LogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SercurityService sercurityService;


    private LogResponse convertToLogResponse(Log log){


       LogResponse response = modelMapper.map(log, LogResponse.class);

       if(!Objects.isNull(log.getAccount())){
           response.setUserName(log.getAccount().getUsername());
       }else {
           response.setUserName("Unknow");
       }


        return response;
    }

    @Async
    public void log(LogLevel level,String message){
        Log log = Log.builder()
                .level(level)
                .messsage(message)
                .account(sercurityService.getAccountIsLogin())
                .build();
        logRepository.save(log);
    }

    public List<Log> getAll(){
        return logRepository.findAll();
    }

    public PagedModel<LogResponse> getAll(Pageable pageable){
        return new PagedModel<>(logRepository.findAll(pageable).map(entity -> {
            return convertToLogResponse(entity);
        }));
    }
}
