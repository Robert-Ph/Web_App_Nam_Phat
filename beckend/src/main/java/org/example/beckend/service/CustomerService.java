package org.example.beckend.service;


import lombok.extern.slf4j.Slf4j;
import org.example.beckend.dto.request.CustomerRequest;
import org.example.beckend.entity.Customer;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.CustomerRepository;
import org.hibernate.sql.exec.ExecutionException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    //create customer
    public Customer create(CustomerRequest request) {

        Customer customer = modelMapper.map(request, Customer.class);
        Optional<Customer> optional = customerRepository.findByTypeCustomerContains(customer.getPhone());
        if(!optional.isEmpty()){
            throw new AppException(ErrorMessage.CUSTOMER_EXIST);

        }
        try {
            customerRepository.save(customer);
        }catch (Exception e){
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


    //Get all customers
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }


}
