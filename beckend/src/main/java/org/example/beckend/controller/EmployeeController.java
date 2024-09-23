package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.EmployeeRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Employee;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(employeeService.create(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size ){
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> data = employeeService.getAll(pageable);

        return ResponseEntity.ok(ApiResponse
                .builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(data)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id,@Valid @RequestBody EmployeeRequest request){
        return ResponseEntity.ok(
                ApiResponse
                        .builder()
                        .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                        .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                        .data(employeeService.update(request, id))
                        .build());
    }
}
