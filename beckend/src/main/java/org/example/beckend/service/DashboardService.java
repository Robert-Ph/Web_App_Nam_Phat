package org.example.beckend.service;


import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Dashboard;
import org.example.beckend.entity.Order;
import org.example.beckend.entity.enums.OrderStatus;
import org.example.beckend.repository.CustomerRepository;
import org.example.beckend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class DashboardService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DebtService debtService;


    public Dashboard getDashboard() {
       return new Dashboard(customerService.findAll(), orderRepository.findAll(), debtService.getDebts(), avePriceOrder("month"),
               totalPriceIsPay(true, "month"), totalPriceIsPay(false, "month"), totalPriceofOrdersByDate("month"),
               numberOfOrdersByDate("month"), numberOfOrdersByDate("day"),totalPriceofOrdersByDate("day") ,numberOfOrdersByDateAndStatus("day", "DELIVERED", true),
               numberOfOrdersByDateAndStatus("day", "DELIVERED", false),
               totalPriceIsPay(true, "day"), totalPriceIsPay(false, "day"));
    }


    // tong don hang theo Date
    public Integer numberOfOrdersByDate(String type) {
        int counter = 0;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (type.equals("month")){
                if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                    counter++;
                }
            }else if (type.equals("year")){
                if (order.getDateCreate().toLocalDate().getYear() == LocalDate.now().getYear()){
                    counter++;
                }
            }else if (type.equals("day")){
                if (order.getDateCreate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()){
                    counter++;
                }
            }
        }
        return counter;
    }

    // tong don hang theo Date, theo trang thai
    public Integer numberOfOrdersByDateAndStatus(String type, String status, boolean bo) {
        int counter = 0;
        List<Order> orders = new ArrayList<>();
        if (bo){
            orders = orderRepository.findByStatus(OrderStatus.valueOf(status));
        }else {
            orders = orderRepository.findAll();
            orders.removeAll(orderRepository.findByStatus(OrderStatus.valueOf(status)));
        }

        for (Order order : orders) {
            if (type.equals("month")){
                if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                    counter++;
                }
            }else if (type.equals("year")){
                if (order.getDateCreate().toLocalDate().getYear() == LocalDate.now().getYear()){
                    counter++;
                }
            }else if (type.equals("day")){
                if (order.getDateCreate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()){
                    counter++;
                }
            }
        }
        return counter;
    }


    //Tổng giá trị đơn hàng của Date
    public Long totalPriceofOrdersByDate(String type) {
        Long totalPrice = 0L;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (type.equals("month")){
                if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("year")){
                if (order.getDateCreate().toLocalDate().getYear() == LocalDate.now().getYear()){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("day")){
                if (order.getDateCreate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()){
                    totalPrice += order.getTotalPrice();
                }
            }
        }
        return totalPrice;
    }


    //Tổng đơn hàng theo Date, dieu kien da thanh toan hoac chua thanh toan
    public Long totalPriceIsPay(boolean isPay, String type) {
        Long totalPrice = 0L;
        List<Order> orders = orderService.getListDebt(isPay);
        for (Order order : orders) {
            if (type.equals("month")){
                if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("year")){
                if (order.getDateCreate().toLocalDate().getYear() == LocalDate.now().getYear()){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("day")){
                if (order.getDateCreate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()){
                    totalPrice += order.getTotalPrice();
                }
            }

        }
        return totalPrice;
    }

    //trung binh gia tri don hang theo Date
    public Double avePriceOrder(String type) {
        Long totalPrice = 0L;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (type.equals("month")){
                if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("year")){
                if (order.getDateCreate().toLocalDate().getYear() == LocalDate.now().getYear()){
                    totalPrice += order.getTotalPrice();
                }
            }else if (type.equals("day")){
                if (order.getDateCreate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()){
                    totalPrice += order.getTotalPrice();
                }
            }
        }
        return (double) (totalPrice/orders.size());
    }

//    //Tổng đơn hàng chua thanh toán
//    public Long totalPriceIsPayFalse(){
//        Long totalPrice = 0L;
//        List<Order> orders = orderService.getListDebt(false);
//        for (Order order : orders) {
//            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
//                totalPrice += order.getTotalPrice();
//            }
//        }
//        return totalPrice;
//    }
    public Long numberOfDebts() {
        return debtService.totalPriceDebts();
    }
}
