package org.example.beckend.repository;

import org.example.beckend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByTypeCustomerContains(String phone);
}
