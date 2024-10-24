package org.example.beckend.service;

import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Debt;
import org.example.beckend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class DebtService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    public List<Debt> getDebts() {
        List<Debt> debts = new ArrayList<Debt>();
        List<Order> orders = orderService.getListDebt();
        Map<Long, Long> list = getListDebtCustomer(orders);
        for (Map.Entry<Long, Long> entry : list.entrySet()) {
           Customer customer = customerService.findCustomerById(entry.getKey());
           Debt debt = new Debt(customer.getId(), customer.getFullName(), customer.getPhone(), entry.getValue());
           debts.add(debt);
        }
        return debts;
    }

    public Map<Long, Long> getListDebtCustomer(List<Order> orders){
        Map<Long, Long> debts = new TreeMap<Long, Long>();
        for (Order order : orders) {
            if (debts.containsKey(order.getCustomer().getId())) {
                debts.put(order.getCustomer().getId(), debts.get(order.getCustomer().getId()) + order.getTotalPrice());
            }else{
                debts.put(order.getCustomer().getId(), order.getTotalPrice());
            }
        }


        return debts;
    }

    public List<Order> getListDebtCustomer(Long customerId) {
        List<Order> result = new ArrayList<>();
        List<Order> orders = orderService.getListDebt();
        for (Order order : orders) {
            if (order.getCustomer().getId().equals(customerId)) {
                result.add(order);
            }
        }
        return result;
    }


}
