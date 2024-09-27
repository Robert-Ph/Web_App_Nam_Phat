package org.example.beckend.repository;

import org.example.beckend.entity.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockOutRepository extends JpaRepository<StockOut,Long> {
}
