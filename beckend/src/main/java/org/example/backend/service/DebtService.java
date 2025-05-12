package org.example.backend.service;

import org.example.backend.entity.Customer;
import org.example.backend.entity.Debt;
import org.example.backend.entity.Order;
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
        List<Order> orders = orderService.getListDebt(false);
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
                    debts.put(order.getCustomer().getId(), debts.get(order.getCustomer().getId()) +  (long) (order.getTotalPrice() + order.getTotalPrice()* (order.getVat()/100)));
                }else{
                    debts.put(order.getCustomer().getId(), (long) (order.getTotalPrice() + order.getTotalPrice()* (order.getVat()/100)));
                }
        }


        return debts;
    }

    public Debt getDebt(Long id) {
        Long totalPrice = 0L;
        List<Order> orders = orderService.getListDebt(false);
        for (Order order : orders) {
            if (order.getCustomer().getId() == id) {
                totalPrice +=  (long) (order.getTotalPrice() + order.getTotalPrice()* (order.getVat()/100));
            }
        }
        Customer customer = customerService.findCustomerById(id);
        return new Debt(id,customer.getFullName(), customer.getPhone(), totalPrice);
    }


    public List<Order> getListDebtCustomer(Long customerId) {
        List<Order> result = new ArrayList<>();
        List<Order> orders = orderService.getListDebt(false);
        for (Order order : orders) {
            if (order.getCustomer().getId().equals(customerId)) {
                result.add(order);
            }
        }
        return result;
    }

    public Long totalPriceDebts(){
        Long totalPrice = 0L;
        List<Order> orders = orderService.getListDebt(false);
        for (Order order : orders) {
            if (order.getCustomer().getId() == 1) {
                totalPrice += order.getTotalPrice();
            }
        }
        return totalPrice;
    }

}
