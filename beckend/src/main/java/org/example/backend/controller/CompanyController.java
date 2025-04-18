package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.request.CompanyRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @PreAuthorize("hasRole('ADMIN')")
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
