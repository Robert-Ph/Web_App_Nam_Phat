package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.CompanyRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Company;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.repository.CompanyRepository;
import org.example.beckend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/system/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PutMapping
    public ResponseEntity<ApiResponse> update(@Valid  @RequestBody CompanyRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                .data(companyService.update(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getInfor() {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                .data(companyService.getMyCompany())
                .build());
    }
}
