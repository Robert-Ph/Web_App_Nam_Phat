package org.example.beckend.controller;

import jakarta.validation.constraints.NotNull;
import org.example.beckend.dto.request.InventoryRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Employee;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
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
    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody InventoryRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(inventoryService.create(request))
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateQuanlity(@RequestParam(value = "quanlity",required = true)
                                                      int quanlity
            , @RequestParam(value = "productId",required = true) Long productId)

    {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                .data(inventoryService.updateQuanlity(quanlity, productId))
                .build());
    }
}
