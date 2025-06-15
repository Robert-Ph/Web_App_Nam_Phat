package org.example.backend.controller.automation;

import org.example.backend.dto.request.automation.MansRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.message.SuccessMessage;
import org.example.backend.repository.automation.MansRepository;
import org.example.backend.service.automation.MansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation/mans")
public class MansController {

    @Autowired
    private MansService service;

    @Autowired
    public MansRepository repository;

    @PostMapping
    public ResponseEntity<ApiResponse> createMans(@RequestBody MansRequest mans) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.createMans(mans))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getMans() {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(repository.findAll())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMans(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.getMans(id))
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateMans(@RequestBody MansRequest mans) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.updateMans(mans))
                .build());
    }
}
