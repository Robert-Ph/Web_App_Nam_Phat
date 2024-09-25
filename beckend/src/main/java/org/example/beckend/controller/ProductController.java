package org.example.beckend.controller;

import jakarta.validation.Valid;
import org.example.beckend.dto.request.ProductRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@RequestBody @Valid ProductRequest request, @PathVariable Long id){
        return ResponseEntity.ok(ApiResponse.builder()
                        .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                        .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                        .data(productService.update(request,id))
                .build());
    }

}