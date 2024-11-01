package org.example.beckend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.example.beckend.dto.request.StockInRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.dto.response.StockInResponse;
import org.example.beckend.entity.StockIn;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.FileService;
import org.example.beckend.service.StockInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@RestController
@RequestMapping("/imports")
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
//

        return ResponseEntity.ok(ApiResponse
                .builder()
                        .code(SuccessMessage.CREATE_DATA_SUCCESS.getCode())
                        .message(SuccessMessage.CREATE_DATA_SUCCESS.getMessage())
                        .data(stockIn)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size ){
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
    public ResponseEntity<ApiResponse> getByFilter(@RequestParam String filter,@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "10") int size ){
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
