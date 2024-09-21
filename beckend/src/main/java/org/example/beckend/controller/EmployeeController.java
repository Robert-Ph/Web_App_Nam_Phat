package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.EmployeeCreateRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessCode.CREATE)
                .messgae("CREATE EMPLOYEE SUCCESSFUL")
                .data(employeeService.create(request))
                .build());
    }
}
