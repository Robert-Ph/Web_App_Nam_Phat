package org.example.beckend.controller;

import org.example.beckend.dto.request.OrderRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(orderService.create(request))
                .build());
    }

    @GetMapping("/{id}")
    public  ResponseEntity<FileSystemResource> dowload(@PathVariable Long id){
        try {
            String path = orderService.createPDF(id);

            File file = new File(path);
            FileSystemResource resource = new FileSystemResource(file);


            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Tạo header cho phản hồi
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf"); // Thay đổi loại file nếu cần

            // Trả về phản hồi
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
