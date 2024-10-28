package org.example.beckend.controller;


import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.entity.Debt;
import org.example.beckend.entity.Order;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.DebtService;
import org.example.beckend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/debt")
public class DebtController {
    @Autowired
    private DebtService debtService;

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllDebt() {
        List<Debt> data = debtService.getDebts();
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getDebt(@PathVariable Long id) {
        List<Order> data = debtService.getListDebtCustomer(id);
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<ApiResponse> getDebtDetailByID(@PathVariable Long id) {
        Debt data = debtService.getDebt(id);
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }

    @GetMapping("/detail/list/{id}")
    public ResponseEntity<ApiResponse> getDebtDetailListByID(@PathVariable Long id) {
        List<Order> data = debtService.getListDebtCustomer(id);
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(data)
                .build());
    }

}
