package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.request.CustomerRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.Customer;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.CustomerService;
import org.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.create(request))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.update(request, id))
                .build());
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<ApiResponse> block(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.block(id))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(customerService.findCustomerById(id))
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> findByPhone(@RequestParam String phone) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(customerService.findByPhoneContains(phone))
                        .build());
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<ApiResponse> findHistory(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(orderService.getListOrderCustomerById(id))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCustomers() {
        List<Customer> data = customerService.findAll();
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse> getFilter(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String filter) {
        Pageable pageable = PageRequest.of(page, size);

        PagedModel<Customer> result;

        if (Objects.isNull(filter)) {
            result = customerService.getAll(pageable);
        } else {
            if (filter.isBlank() || filter.isEmpty()) {
                result = customerService.getAll(pageable);
            } else {
                result = customerService.getByFilter(filter, pageable);
            }
        }

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(result)
                        .build());
    }
    // @GetMapping("/search")
    // public ResponseEntity<ApiResponse> getFilter(@RequestParam(defaultValue =
    // "0")int page,@RequestParam(defaultValue = "10") int
    // size,@RequestParam(required = false)String filter ){
    // Pageable pageable = PageRequest.of(page,size);
    //
    // PagedModel<Customer> result;
    //
    // if(Objects.isNull(filter)){
    // result = customerService.getAll(pageable);
    // }else {
    // if(filter.isBlank() || filter.isEmpty()){
    // result = customerService.getAll(pageable);
    // }else {
    // result = customerService.getByFilter(filter,pageable);
    // }
    // }
    //
    // return ResponseEntity.ok(
    // ApiResponse.builder()
    // .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
    // .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
    // .data(result)
    // .build()
    // );
    // }
}
