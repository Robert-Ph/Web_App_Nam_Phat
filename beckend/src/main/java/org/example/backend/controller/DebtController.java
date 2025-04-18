package org.example.backend.controller;


import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.Debt;
import org.example.backend.entity.Order;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.DebtService;
import org.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/debt")
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
