package org.example.beckend.service;


import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Dashboard;
import org.example.beckend.entity.Order;
import org.example.beckend.repository.CustomerRepository;
import org.example.beckend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
       return new Dashboard(customerService.findAll(), orderRepository.findAll(), debtService.getDebts());
    }

    public Integer numberOfCustomers() {
        List<Customer> customers = customerService.findAll();
        return customers.size();
    }

    public Integer numberOfOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.size();
    }

    public Long totalPriceofOrders() {
        Long totalPrice = 0L;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            totalPrice += order.getTotalPrice();
        }
        return totalPrice;
    }


    public Long numberOfDebts() {
        return debtService.totalPriceDebts();
    }
}
