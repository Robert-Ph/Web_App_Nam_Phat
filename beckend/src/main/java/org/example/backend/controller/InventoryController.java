package org.example.backend.controller;

import org.example.backend.dto.response.ApiResponse;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;


    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size ){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(inventoryService.getAll(pageable))
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getByFilter(@RequestParam String filter,@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size ){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(inventoryService.getAllByFilter(filter,pageable))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(inventoryService.getInventoryByProductId(id))
                        .build()
        );
    }

}
