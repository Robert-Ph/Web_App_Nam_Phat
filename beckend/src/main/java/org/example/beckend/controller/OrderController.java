package org.example.beckend.controller;

import org.example.beckend.dto.request.OrderItemRequest;
import org.example.beckend.dto.request.OrderRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Value("${file.invoice.path}")
    private String pathOrdeFile;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody OrderRequest request) {

        System.out.println(request.getOrderItems() instanceof List<OrderItemRequest>);
       request.getOrderItems().forEach(item-> {System.out.println(item);});

        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(orderService.create(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(orderService.getAllForList(pageable))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                .data(orderService.getById(id))
                .build());
    }

//    @GetMapping("/{id}")
//    public  ResponseEntity<FileSystemResource> dowload(@PathVariable Long id){
//        try {
//            orderService.createPDF(id);
//
//            File file = new File(pathOrdeFile + File.separator +id + ".pdf");
//            FileSystemResource resource = new FileSystemResource(file);
//
//
//            if (!resource.exists()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//            }
//
//            // Tạo header cho phản hồi
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
//            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf"); // Thay đổi loại file nếu cần
//
//            // Trả về phản hồi
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .body(resource);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
}
