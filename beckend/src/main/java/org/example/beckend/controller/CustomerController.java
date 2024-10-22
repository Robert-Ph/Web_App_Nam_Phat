package org.example.beckend.controller;


import jakarta.validation.Valid;
import org.example.beckend.dto.request.CustomerRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Employee;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.repository.CustomerRepository;
import org.example.beckend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

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

//    @GetMapping("/search")
//    public ResponseEntity<ApiResponse> findByPhone(@RequestParam String phone){
//        return ResponseEntity.ok(
//                ApiResponse.builder()
//                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
//                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
//                        .data(customerService.findByPhoneContains(phone))
//                        .build()
//        );
//    }


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

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getFilter(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size,@RequestParam(required = false)String filter ){
        Pageable pageable = PageRequest.of(page,size);

        PagedModel<Customer> result;

        if(Objects.isNull(filter)){
            result = customerService.getAll(pageable);
        }else {
            if(filter.isBlank() || filter.isEmpty()){
                result = customerService.getAll(pageable);
            }else {
                result = customerService.getByFilter(filter,pageable);
            }
        }

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(result)
                        .build()
        );
    }
}
