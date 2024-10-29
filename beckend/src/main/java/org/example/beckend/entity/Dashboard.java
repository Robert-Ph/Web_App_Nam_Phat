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

    private int totalOrdersDay;// tong don hang/ngay
    private Long totalPriceDay;
    private int totalOrdersRevenueDay;
    private int totalOrdersFalseDay;
    private Long realOrderRevenueDay;
    private Long debtOrderRevenueDay;


    public Dashboard() {}


    public Dashboard(List<Customer> customers, List<Order> orders, List<Debt> debts, Double aveRevenue, Long realRevenue, Long debtRevenue, Long sumRevenue, int sumOrders, int totalOrdersDay, Long totalPriceDay, int totalOrdersRevenueDay, int totalOrdersFalseDay, Long realOrderRevenueDay, Long debtOrderRevenueDay) {
        this.customers = customers;
        this.orders = orders;
        this.debts = debts;
        this.aveRevenue = aveRevenue;
        this.realRevenue = realRevenue;
        this.debtRevenue = debtRevenue;
        this.sumRevenue = sumRevenue;
        this.sumOrders = sumOrders;
        this.totalOrdersDay = totalOrdersDay;
        this.totalPriceDay = totalPriceDay;
        this.totalOrdersRevenueDay = totalOrdersRevenueDay;
        this.totalOrdersFalseDay = totalOrdersFalseDay;
        this.realOrderRevenueDay = realOrderRevenueDay;
        this.debtOrderRevenueDay = debtOrderRevenueDay;
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

    public int getTotalOrdersDay() {
        return totalOrdersDay;
    }

    public void setTotalOrdersDay(int totalOrdersDay) {
        this.totalOrdersDay = totalOrdersDay;
    }

    public int getTotalOrdersRevenueDay() {
        return totalOrdersRevenueDay;
    }

    public void setTotalOrdersRevenueDay(int totalOrdersRevenueDay) {
        this.totalOrdersRevenueDay = totalOrdersRevenueDay;
    }

    public int getTotalOrdersFalseDay() {
        return totalOrdersFalseDay;
    }

    public void setTotalOrdersFalseDay(int totalOrdersFalseDay) {
        this.totalOrdersFalseDay = totalOrdersFalseDay;
    }

    public Long getRealOrderRevenueDay() {
        return realOrderRevenueDay;
    }

    public void setRealOrderRevenueDay(Long realOrderRevenueDay) {
        this.realOrderRevenueDay = realOrderRevenueDay;
    }

    public Long getDebtOrderRevenueDay() {
        return debtOrderRevenueDay;
    }

    public void setDebtOrderRevenueDay(Long debtOrderRevenueDay) {
        this.debtOrderRevenueDay = debtOrderRevenueDay;
    }

    public Long getTotalPriceDay() {
        return totalPriceDay;
    }

    public void setTotalPriceDay(Long totalPriceDay) {
        this.totalPriceDay = totalPriceDay;
    }
}
