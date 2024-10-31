package org.example.beckend.entity;

import java.util.List;

public class Dashboard {

    private List<Customer> customers;
    private List<Order> orders;
    private List<Debt> debts;
    private Double aveRevenue;
    private Long realRevenue;
    private Long debtRevenue;
    private Long sumRevenue;
    private int sumOrders;

    public Dashboard() {}

    public Dashboard(List<Customer> customers, List<Order> orders, List<Debt> debts, Double aveRevenue, Long realRevenue, Long debtRevenue, Long sumRevenue, int sumOrders) {
        this.customers = customers;
        this.orders = orders;
        this.debts = debts;
        this.aveRevenue = aveRevenue;
        this.realRevenue = realRevenue;
        this.debtRevenue = debtRevenue;
        this.sumRevenue = sumRevenue;
        this.sumOrders = sumOrders;
    }

    public Dashboard(List<Customer> customers, List<Order> orders, List<Debt> debts, Double aveRevenue, Long realRevenue, Long debtRevenue) {
        this.customers = customers;
        this.orders = orders;
        this.debts = debts;
        this.aveRevenue = aveRevenue;
        this.realRevenue = realRevenue;
        this.debtRevenue = debtRevenue;
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

    public Double getAveRevenue() {
        return aveRevenue;
    }

    public void setAveRevenue(Double aveRevenue) {
        this.aveRevenue = aveRevenue;
    }

    public Long getRealRevenue() {
        return realRevenue;
    }

    public void setRealRevenue(Long realRevenue) {
        this.realRevenue = realRevenue;
    }

    public Long getDebtRevenue() {
        return debtRevenue;
    }

    public void setDebtRevenue(Long debtRevenue) {
        this.debtRevenue = debtRevenue;
    }

    public Long getSumRevenue() {
        return sumRevenue;
    }

    public void setSumRevenue(Long sumRevenue) {
        this.sumRevenue = sumRevenue;
    }

    public int getSumOrders() {
        return sumOrders;
    }

    public void setSumOrders(int sumOrders) {
        this.sumOrders = sumOrders;
    }
}
