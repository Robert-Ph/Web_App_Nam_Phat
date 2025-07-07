package org.example.backend.controller.automation;

import org.example.backend.dto.request.automation.PaperRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.automation.Paper;
import org.example.backend.message.SuccessMessage;
import org.example.backend.repository.automation.PagerRepository;
import org.example.backend.service.automation.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation")
public class PaperController {
    @Autowired
    private PaperService paperService;

    @Autowired
    private PagerRepository paperRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> addPaper(@RequestBody PaperRequest paper) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(paperService.createPaper(paper))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllPapers() {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(paperRepository.findAll())
                .build());
    }

    @DeleteMapping
    public void deletePaper(@RequestBody Paper paper) {
      paperService.deletePaper(paper);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPaper(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(paperService.getPaperById(id))
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updatePaper(@RequestBody Paper paper) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(paperService.updatePaper(paper))
                .build());
    }
}
