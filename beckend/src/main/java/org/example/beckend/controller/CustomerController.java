package org.example.beckend.controller;


import jakarta.validation.Valid;
import org.example.beckend.dto.request.CustomerRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Customer;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.repository.CustomerRepository;
import org.example.beckend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CustomerRequest request) {
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.create(request))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody CustomerRequest request) {
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.update(request, id))
                .build());
    }


    @GetMapping
    public ResponseEntity<ApiResponse> getAllCustomers() {
        List<Customer> data = customerService.findAll();
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }
}
