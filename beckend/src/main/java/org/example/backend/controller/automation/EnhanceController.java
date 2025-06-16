package org.example.backend.controller.automation;

import org.example.backend.dto.request.automation.EnhanceRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.automation.Enhance;
import org.example.backend.message.SuccessMessage;
import org.example.backend.repository.automation.EnhanceRepository;
import org.example.backend.service.automation.EnhanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation/enhance")
public class EnhanceController {

    @Autowired
    private EnhanceService enhanceService;

    @Autowired
    private EnhanceRepository enhanceRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> addEnhance(@RequestBody EnhanceRequest enhance) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(enhanceService.createEnhance(enhance))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllEnhances() {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(enhanceRepository.findAll())
                .build());
    }



    @PutMapping
    public ResponseEntity<ApiResponse> updateEnhance(@RequestBody Enhance enhance) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(enhanceService.updateEnhance(enhance))
                .build());
    }
}
