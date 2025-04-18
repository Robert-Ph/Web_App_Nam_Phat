package org.example.backend.service;


import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.request.CustomerRequest;
import org.example.backend.entity.Customer;
import org.example.backend.entity.enums.LogLevel;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LogService logService;


    public Customer findCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.CUSTOMER_NOT_FOUND));
    }


    public Customer findCustomerByPhone(String phone) {
        return customerRepository.findByPhone(phone).orElseThrow(() -> new AppException(ErrorMessage.CUSTOMER_NOT_FOUND));
    }

    //create customer
    public Customer create(CustomerRequest request) {

        Customer customer = modelMapper.map(request, Customer.class);
        Optional<Customer> optional = customerRepository.findByTypeCustomerContains(customer.getPhone());
        if (!optional.isEmpty()) {
            throw new AppException(ErrorMessage.CUSTOMER_EXIST);

        }
        try {
            customerRepository.save(customer);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return customer;
    }

    //Update Customer for id
    public Customer update(CustomerRequest request, Long id) {

        Customer result = customerRepository.findById(id).orElse(null);
        if (result == null) {
            throw new AppException(ErrorMessage.UNUNCATEGORIZED);
        }
        modelMapper.map(request, result);
        customerRepository.save(result);
        return result;
    }

    public List<Customer> findByPhoneContains(String phone){
        System.out.print("Phone:" + phone);
        if(phone.isEmpty() || phone.isBlank()){
            return new ArrayList<>();
        }
        return customerRepository.findByPhoneContains(phone);
    }

    //Method for getAllEmployee with pageable
    public PagedModel<Customer> getAll(Pageable pageable) {
        logService.log(LogLevel.INFOR,"Lấy danh sách nhân viên");

        return new PagedModel<>(customerRepository.findAll(pageable));
    }

    public PagedModel<Customer> getByFilter(String filter,Pageable pageable) {
        logService.log(LogLevel.INFOR,"Lấy danh sách nhân viên với filter: " + filter);

        return new PagedModel<>(customerRepository.findFilter(filter,pageable));
    }


    //Get all customers
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }


}
