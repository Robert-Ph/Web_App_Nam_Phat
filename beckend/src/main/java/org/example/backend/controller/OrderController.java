package org.example.backend.controller;

import org.example.backend.dto.request.OrderItemRequest;
import org.example.backend.dto.request.OrderRequest;
import org.example.backend.dto.request.OrderUpdateRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.dto.response.OrderResponseForList;
import org.example.backend.entity.enums.OrderStatus;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/orders")
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
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "15") int size) {
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(orderService.getAllForList(pageable))
                .build());
    }


    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getByCondition(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "15") int size,
                                                      @RequestParam(required = false)boolean ispay,
                                                      @RequestParam(required = false)String filter,
                                                      @RequestParam(required = true)String type
                                                      ) {
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page, size,sort);

        PagedModel<OrderResponseForList> result = null;

        if(type.equals("all") || type.equals("newest")){

            if(Objects.isNull(filter)){
                result = orderService.getAllForList(pageable);
            }else {
                result = orderService.getByIdOrNameAnd(pageable,filter);
            }
        }else {
            if(type.equals("paid")){
                result =  orderService.getByIdOrNameAndIspay(pageable,true,filter);
            }else if(type.equals("unpaid")){
                result =  orderService.getByIdOrNameAndIspay(pageable,false,filter);
            }else if(type.equals("confirmed")){
                result =  orderService.getByIdOrNameAndStatus(pageable, OrderStatus.CONFIM,filter);
            }else if(type.equals("completed")){
                result = orderService.getByIdOrNameAndStatus(pageable, OrderStatus.FISNISHED,filter);
            }
            else if(type.equals("delivered")){
                result = orderService.getByIdOrNameAndStatus(pageable, OrderStatus.DELIVERED,filter);
            } else if(type.equals("cancelled")){
                result = orderService.getByIdOrNameAndStatus(pageable, OrderStatus.CANCELLED,filter);
            }
            else {
                result = orderService.getAllForList(pageable);
            }
        }

        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(result)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(orderService.getById(id))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id,@RequestBody OrderUpdateRequest update){
        return ResponseEntity.ok(ApiResponse.builder()
                .code(SuccessMessage.UPDATE_DATE_SUCCESS.getCode())
                .message(SuccessMessage.UPDATE_DATE_SUCCESS.getMessage())
                .data(orderService.update(id,update))
                .build());
    }

    @PutMapping("/ispay/{id}")
    public void updateIspay(@PathVariable Long id){
        orderService.updtateIsPay(id);
    }

    @PutMapping("/status-con/{id}")
    public void updateStatusCon(@PathVariable Long id){
        orderService.updtateStatusCon(id);
    }

    @PutMapping("/status-fis/{id}")
    public void updateStatusFis(@PathVariable Long id){
        orderService.updtateStatusFis(id);
    }

    @PutMapping("/status-can/{id}")
    public void updateStatusCan(@PathVariable Long id){
        orderService.updtateStatusCan(id);
    }

    @PutMapping("/status-devi/{id}")
    public void updateStatusDevi(@PathVariable Long id){
        orderService.updtateStatusDevii(id);
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
