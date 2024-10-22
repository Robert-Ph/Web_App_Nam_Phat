package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.EmployeeRequest;
import org.example.beckend.dto.response.AccountResponse;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Employee;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

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
        PagedModel<Employee> data = employeeService.getAll(pageable);

        return ResponseEntity.ok(ApiResponse
                .builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(data)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(employeeService.getById(id))
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
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getFilter(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size,@RequestParam(required = false)String filter ){
        Pageable pageable = PageRequest.of(page,size);

        PagedModel<Employee> result;

        if(Objects.isNull(filter)){
            result = employeeService.getAll(pageable);
        }else {
            if(filter.isBlank() || filter.isEmpty()){
                result = employeeService.getAll(pageable);
            }else {
                result = employeeService.getByFilter(filter,pageable);
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
