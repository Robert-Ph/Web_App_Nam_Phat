package org.example.beckend.controller;

import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logs")
public class LogController {
    @Autowired
    private LogService logService;
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0")int page, @RequestParam(defaultValue = "10") int size ){
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page,size,sort);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(logService.getAll(pageable))
                        .build()
        );
    }
}
