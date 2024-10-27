package org.example.beckend.entity;

import java.util.List;

public class Dashboard {

    private List<Customer> customers;
    private List<Order> orders;
    private List<Debt> debts;

    public Dashboard() {}

    public Dashboard(List<Customer> customers, List<Order> orders, List<Debt> debts) {
        this.customers = customers;
        this.orders = orders;
        this.debts = debts;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Debt> getDebts() {
        return debts;
    }

    public void setDebts(List<Debt> debts) {
        this.debts = debts;
    }
}
