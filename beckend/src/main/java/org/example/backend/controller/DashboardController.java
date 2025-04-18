package org.example.backend.controller;


import org.example.backend.dto.response.ApiResponse;
import org.example.backend.message.SuccessMessage;
import org.example.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;



    @GetMapping
    public ResponseEntity<ApiResponse> getDashboard() {
        return  ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
                .data(dashboardService.getDashboard())
                .build());
    }
//    @GetMapping("/totalcustomer")
//    public ResponseEntity<ApiResponse> totalCustomer() {
//        return  ResponseEntity.ok(ApiResponse
//                .builder()
//                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
//                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
//                .data(dashboardService.numberOfCustomers())
//                .build());
//    }
//    @GetMapping("/totalpriceorder")
//    public ResponseEntity<ApiResponse> totalOrder() {
//        return  ResponseEntity.ok(ApiResponse
//                .builder()
//                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
//                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
//                .data(dashboardService.numberOfOrders())
//                .build());
//    }
//    @GetMapping("/totalpricedebt")
//    public ResponseEntity<ApiResponse> totalDebt() {
//        return  ResponseEntity.ok(ApiResponse
//                .builder()
//                .code(SuccessMessage.GET_DATA_SUCCESS.getCode())
//                .message(SuccessMessage.GET_DATA_SUCCESS.getMessage())
//                .data(dashboardService.numberOfDebts())
//                .build());
//    }
}
