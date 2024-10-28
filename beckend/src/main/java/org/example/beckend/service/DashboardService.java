package org.example.beckend.service;


import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Dashboard;
import org.example.beckend.entity.Order;
import org.example.beckend.repository.CustomerRepository;
import org.example.beckend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
       return new Dashboard(customerService.findAll(), orderRepository.findAll(), debtService.getDebts(), avePriceOrder(), totalPriceIsPayTrue(), totalPriceIsPayFalse(), totalPriceofOrdersByMonth(), numberOfOrdersByMonth());
    }

    public Integer numberOfCustomers() {
        List<Customer> customers = customerService.findAll();
        return customers.size();
    }

    public Integer numberOfOrdersByMonth() {
        int counter = 0;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                counter++;
            }

        }
        return counter;
    }

    public Long totalPriceofOrdersByMonth() {
        Long totalPrice = 0L;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                totalPrice += order.getTotalPrice();
            }

        }
        return totalPrice;
    }
    public Long totalPriceIsPayTrue(){
        Long totalPrice = 0L;
        List<Order> orders = orderService.getListDebt(true);
        for (Order order : orders) {
            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                totalPrice += order.getTotalPrice();
            }
        }
        return totalPrice;
    }

    public Double avePriceOrder(){
        Long totalPrice = 0L;
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                totalPrice += order.getTotalPrice();
            }
        }
        return (double) (totalPrice/orders.size());
    }

    public Long totalPriceIsPayFalse(){
        Long totalPrice = 0L;
        List<Order> orders = orderService.getListDebt(false);
        for (Order order : orders) {
            if (order.getDateCreate().toLocalDate().getMonth().equals(LocalDate.now().getMonth())){
                totalPrice += order.getTotalPrice();
            }
        }
        return totalPrice;
    }
    public Long numberOfDebts() {
        return debtService.totalPriceDebts();
    }
}
