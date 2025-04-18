package org.example.backend.entity;

public class Debt {
    private Long customerID;
    private String nameCustomer;
    private String phoneNumber;
    private Long totalAmount;
    private Integer monthlyPayment;

    public Debt() {
    }

    public Debt(Long customerID, String nameCustomer, String phoneNumber, Long totalAmount) {
        this.customerID = customerID;
        this.nameCustomer = nameCustomer;
        this.phoneNumber = phoneNumber;
        this.totalAmount = totalAmount;

    }

    public Long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(Long customerID) {
        this.customerID = customerID;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }


    public Integer getMonthlyPayment() {
        return monthlyPayment;
    }

    public void setMonthlyPayment(Integer monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
    }
}
