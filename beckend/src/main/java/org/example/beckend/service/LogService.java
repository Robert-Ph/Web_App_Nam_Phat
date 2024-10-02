package org.example.beckend.service;

import org.example.beckend.contains.LogLevel;
import org.example.beckend.dto.response.AccountResponse;
import org.example.beckend.dto.response.LogResponse;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Log;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.AccountRepository;
import org.example.beckend.repository.LogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    @Autowired
    private AccountRepository accountRepository;


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
//        SecurityContext context = SecurityContextHolder.getContext();
//        Account account = null;
//
//        if(!Objects.isNull(context.getAuthentication())){
//            Long id = Long.parseLong(context.getAuthentication().getName());
//
//             account = accountRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.SERVER_ERROR));
//        }

        Account account = sercurityService.getAccountIsLogin();
        Log log = Log.builder()
                .level(level)
                .messsage(message)
                .account(account)
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

    public void deleteByDateCreateBefore(LocalDateTime dateTime){
         logRepository.deleteByDateCreateLessThan(dateTime);
    }
}
