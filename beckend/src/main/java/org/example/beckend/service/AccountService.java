package org.example.beckend.service;

import org.example.beckend.dto.request.AccountRequest;
import org.example.beckend.dto.request.UpdateAccountRequest;
import org.example.beckend.dto.response.AccountResponse;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Employee;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.AccountRepository;
import org.example.beckend.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;


    //Method for create user

    public AccountResponse create(AccountRequest request){


        Optional<Employee> employee = employeeRepository.findById(request.getEmployeeId());

        if(employee.isEmpty()){
            throw  new AppException(ErrorMessage.EMPLOYEE_NOT_FOUND);
        }

        if(!accountRepository.findByUsername(request.getUsername()).isEmpty()){
            throw  new AppException(ErrorMessage.USERNAME_EXIST);
        }
        Account account = modelMapper.map(request,Account.class);
        PasswordEncoder encoder = new BCryptPasswordEncoder(10);

        account.setPassword(encoder.encode(account.getPassword()));
        account.setStatus(true);
        account.setEmployee(employee.get());


        //Catch exception if many request create user
        try {
            account = accountRepository.save(account);

        }catch (DataIntegrityViolationException exception){
            throw  new AppException(ErrorMessage.USERNAME_EXIST);

        }
        return modelMapper.map(account,AccountResponse.class);
    }

    //Method for update Account

    public AccountResponse update(UpdateAccountRequest request, Long id){
        Account account = accountRepository.findById(id).orElseThrow(()-> new AppException(ErrorMessage.USER_NOT_EXIST));

       account.setPermission(request.getPermission());
       account.setStatus(request.getStatus());
       account.setPassword(new BCryptPasswordEncoder(10).encode(request.getPassword()));


        //Catch exception if many request create user
        try {
            account = accountRepository.save(account);

        }catch (DataIntegrityViolationException exception){
            throw  new AppException(ErrorMessage.USERNAME_EXIST);

        }

        return  modelMapper.map(account,AccountResponse.class);
    }

}
