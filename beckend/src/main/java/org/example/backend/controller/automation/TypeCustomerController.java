package org.example.backend.controller.automation;

import org.example.backend.dto.request.automation.TypeCutomerRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.automation.TypeCustomer;
import org.example.backend.message.SuccessMessage;
import org.example.backend.repository.automation.TypeCustomerRepository;
import org.example.backend.service.CustomerService;
import org.example.backend.service.automation.TypeCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation/typecustomer")
public class TypeCustomerController {

    @Autowired
    private TypeCustomerService typeCustomerService;

    @Autowired
    private TypeCustomerRepository typeCustomerRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> createTypeCustomer(@RequestBody TypeCutomerRequest typeCustomer) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(typeCustomerService.createTypeCustomer(typeCustomer))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTypeCustomers() {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(typeCustomerRepository.findAll())
                .build());
    }



    @PutMapping
    public ResponseEntity<ApiResponse> updateTypeCustomer(@RequestBody TypeCustomer typeCustomer) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(typeCustomerService.updateTypeCustomer(typeCustomer))
                .build());
    }
}
