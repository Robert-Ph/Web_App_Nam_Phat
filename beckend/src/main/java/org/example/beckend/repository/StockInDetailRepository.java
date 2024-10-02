package org.example.beckend.repository;

import org.example.beckend.entity.StockInDetail;
import org.example.beckend.entity.embeddable.StockInDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockInDetailRepository extends JpaRepository<StockInDetail, StockInDetailId> {
}
