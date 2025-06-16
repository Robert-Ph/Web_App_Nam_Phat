package org.example.backend.controller.automation;


import org.example.backend.dto.request.automation.DieCuttingRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.automation.DieCutting;
import org.example.backend.message.SuccessMessage;
import org.example.backend.repository.automation.DieCuttingRepository;
import org.example.backend.service.automation.DieCuttingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation/diecutting")
public class DieCuttingController {

    @Autowired
    private DieCuttingService service;

    @Autowired
    private DieCuttingRepository dieCuttingRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody DieCuttingRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.create(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(){
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(dieCuttingRepository.findAll())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable long id){
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.findById(id))
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse> update(@RequestBody DieCutting dieCutting){
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(service.update(dieCutting))
                .build());
    }

}
