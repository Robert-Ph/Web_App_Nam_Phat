package org.example.backend.service;

import org.example.backend.entity.enums.LogLevel;
import org.example.backend.dto.request.AccountRequest;
import org.example.backend.dto.request.UpdateAccountRequest;
import org.example.backend.dto.response.AccountResponse;
import org.example.backend.entity.Account;
import org.example.backend.entity.Employee;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.AccountRepository;
import org.example.backend.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SercurityService sercurityService;

    @Autowired LogService logService;


    //Method for create user


    private AccountResponse converToAccountResponse(Account account){
        modelMapper.typeMap(Account.class, AccountResponse.class).addMappings(mapper ->
                mapper.map(src -> src.getEmployee().getId(), AccountResponse::setEmployeeId));


        return modelMapper.map(account, AccountResponse.class);
    }
    public AccountResponse create(AccountRequest request) {


        Optional<Employee> employee = employeeRepository.findById(request.getEmployeeId());

        if (employee.isEmpty()) {
            throw new AppException(ErrorMessage.EMPLOYEE_NOT_FOUND);
        }

        if (!accountRepository.findByUsername(request.getUsername()).isEmpty()) {
            throw new AppException(ErrorMessage.USERNAME_EXIST);
        }
       if(!Objects.isNull(request.getEmployeeId())){
           if(!accountRepository.findByEmployee(employeeRepository.findById(request.getEmployeeId()).get()).isEmpty()){
               throw new AppException(ErrorMessage.EMPLOYEE_HAVE_ACCOUNT);
           }
       }


        Account account = modelMapper.map(request, Account.class);
        PasswordEncoder encoder = new BCryptPasswordEncoder(10);

        account.setPassword(encoder.encode(account.getPassword()));
        account.setStatus(true);
        account.setEmployee(employee.get());


        //Catch exception if many request create user
        try {
            account = accountRepository.save(account);
            logService.log(LogLevel.INFOR,"Tạo tài khoản  với username:" + account.getUsername());

        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorMessage.USERNAME_EXIST);

        }
        return converToAccountResponse(account);
    }

    //Method for update Account

    public AccountResponse update(UpdateAccountRequest request, Long id) {
        if(Objects.isNull(id)){
            throw new AppException(ErrorMessage.USER_NOT_EXIST);
        }

        Account account = accountRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_EXIST));

        account.setPermission(request.getPermission());
        account.setStatus(request.getStatus());
        if(!Objects.isNull(request.getPassword()) ){
            if(!request.getPassword().isEmpty() && !request.getPassword().isBlank()){
                account.setPassword(new BCryptPasswordEncoder(10).encode(request.getPassword()));
            }
        }


        //Catch exception if many request create user
        try {
            account = accountRepository.save(account);

            logService.log(LogLevel.DANGER,"Cập nhật tài khoản với username:" + account.getUsername());

        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorMessage.USERNAME_EXIST);

        }

        return converToAccountResponse(account);
    }

    public List<AccountResponse> findAllExceptId(Long id) {
        List<Account> accounts = accountRepository.findAllExceptId(id);
        return accounts.stream().map(entity -> {
            return converToAccountResponse(entity);
        }).collect(Collectors.toList());
    }

    public List<AccountResponse> findAllExceptIsLogin() {
        Long id = sercurityService.getAccountIsLogin().getId();
        return findAllExceptId(id);
    }

    public PagedModel<AccountResponse> findAllExceptId(Long id, Pageable pageable) {
        Page<Account> page = accountRepository.findAllExceptId(id, pageable);
        Page<AccountResponse> convert = page.map(entity -> {
            return converToAccountResponse(entity);
        });
        return new PagedModel<>(convert);
    }

    public PagedModel<AccountResponse> findAll(Pageable pageable){
        Page<Account> page = accountRepository.findAll( pageable);
        Page<AccountResponse> convert = page.map(entity -> {
            return converToAccountResponse(entity);
        });
        return new PagedModel<>(convert);
    }
    public PagedModel<AccountResponse> findFilter(String filter,Pageable pageable){
        Page<Account> page = accountRepository.findFilter(filter, pageable);
        Page<AccountResponse> convert = page.map(entity -> {
            return converToAccountResponse(entity);
        });
        return new PagedModel<>(convert);
    }

    public PagedModel<AccountResponse> findAllExceptIsLogin(Pageable pageable) {
        Long id = sercurityService.getAccountIsLogin().getId();

        PagedModel<Account> paged = new PagedModel<>(accountRepository.findAll(pageable));
        return findAllExceptId(id, pageable);
    }

}
