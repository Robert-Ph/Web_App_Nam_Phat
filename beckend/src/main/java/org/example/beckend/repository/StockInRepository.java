package org.example.beckend.repository;

import org.example.beckend.entity.StockIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockInRepository extends JpaRepository<StockIn,Long> {
}
