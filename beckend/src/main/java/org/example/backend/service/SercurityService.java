package org.example.backend.service;

import org.example.backend.entity.Account;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class SercurityService {

    @Autowired
    AccountRepository accountRepository;

    public Account getAccountIsLogin(){
        SecurityContext context = SecurityContextHolder.getContext();
        if(!Objects.isNull(context.getAuthentication())){
            Long id = Long.parseLong(context.getAuthentication().getName());
            return  accountRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.SERVER_ERROR));
        }
        return null;
    }
}
