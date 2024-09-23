package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.AccountRequest;
import org.example.beckend.dto.request.UpdateAccountRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody AccountRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse
                        .builder()
                        .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                        .data(accountService.create(request))
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody UpdateAccountRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                .data(accountService.update(request, id))
                .build());
    }
}
