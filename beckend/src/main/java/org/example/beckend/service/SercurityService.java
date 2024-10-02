package org.example.beckend.service;

import org.example.beckend.entity.Account;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.AccountRepository;
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
