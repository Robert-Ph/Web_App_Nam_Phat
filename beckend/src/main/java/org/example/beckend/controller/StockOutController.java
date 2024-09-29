package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.dto.request.StockOutRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.StockOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exports")
public class StockOutController {

    @Autowired
    private StockOutService stockOutService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody StockOutRequest request) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                        .data(stockOutService.create(request))
                        .build()
        );

    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllPageable(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size){
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page,size,sort);
        return ResponseEntity.ok(ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(stockOutService.getAll(pageable))
                .build());
    }
}