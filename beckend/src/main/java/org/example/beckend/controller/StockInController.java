package org.example.beckend.controller;


import org.example.beckend.dto.request.StockInRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.service.StockInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/imports")
public class StockInController {

    @Autowired
    private StockInService stockInService;


    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody StockInRequest request){
        stockInService.create(request);
        return ResponseEntity.ok(ApiResponse.builder().build());
    }
}
