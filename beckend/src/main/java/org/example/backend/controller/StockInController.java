package org.example.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.example.backend.dto.request.StockInRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.dto.response.StockInResponse;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.StockInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@RestController
@RequestMapping("/api/imports")
public class StockInController {

    @Autowired
    private StockInService stockInService;



    @Transactional
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> create(@Valid @RequestPart(value = "request")String request,@RequestPart(value = "file") MultipartFile file){
        StockInRequest stockInRequest = convertStringToModel(request);

        System.out.println(stockInRequest);

      if(Objects.isNull(stockInRequest.getSupplier()) || Objects.isNull(stockInRequest.getTotalPrice()) ){
          throw new AppException(ErrorMessage.MISSING_ARGUMENT);
      }

       try {
           String fileName = file.getOriginalFilename();
           if (file == null ) {
               throw new AppException(ErrorMessage.IMAGE_IS_REQUIRE);
           }else if((!fileName.endsWith(".jpg") && !fileName.endsWith(".png"))){
               throw  new AppException(ErrorMessage.IMAGE_NOT_VALID);
           }
       }catch (NullPointerException exception) {
           throw new AppException(ErrorMessage.IMAGE_IS_REQUIRE);
       }


        StockInResponse stockIn = stockInService.create(stockInRequest,file);


        return ResponseEntity.ok(ApiResponse
                .builder()
                        .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                        .data(stockIn)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "15") int size ){
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page,size,sort);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(stockInService.getAll(pageable))
                        .build()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getByFilter(@RequestParam String filter,@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "15") int size ){
        Sort sort = Sort.by("dateCreate").descending();
        Pageable pageable = PageRequest.of(page,size,sort);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(stockInService.getByFilter(filter,pageable))
                        .build()
        );
    }

    @GetMapping("/{id}")

    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(ApiResponse
                .builder()
                        .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                        .data(stockInService.getById(id))
                .build());
    }

    private StockInRequest convertStringToModel(String str){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            StockInRequest stockInRequest = objectMapper.readValue(str, StockInRequest.class);
            return stockInRequest;
        } catch (Exception e) {

            System.out.print(e.getMessage());
           throw new AppException(ErrorMessage.SERVER_ERROR);
        }

    }
}
