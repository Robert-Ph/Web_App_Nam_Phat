package org.example.beckend.repository;

import org.example.beckend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByIsPay(Boolean isPay);
}
