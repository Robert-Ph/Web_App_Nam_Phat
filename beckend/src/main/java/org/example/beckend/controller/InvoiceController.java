package org.example.beckend.controller;

import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Invoice;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    @Value("${file.invoice.path}")
    private String pathOrdeFile;

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/dowload/{id}")
    public ResponseEntity<FileSystemResource> dowload(@PathVariable Long id) {
        try {
            Invoice invoice = invoiceService.getById(id);

            File file = new File(pathOrdeFile + File.separator + invoice.getFile());
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

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(invoiceService.getAll(pageable))
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getByFilter(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,@RequestParam String filter) {
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(invoiceService.getByFilter(filter,pageable))
                .build());
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
//        return ResponseEntity.ok(
//                ApiResponse.builder()
//                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
//                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
//                        .data(invoiceService.getById(id))
//                        .build()
//        );
//    }


}
