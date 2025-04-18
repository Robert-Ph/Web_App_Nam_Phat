package org.example.backend.repository;

import org.example.backend.entity.StockInDetail;
import org.example.backend.entity.embeddable.StockInDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockInDetailRepository extends JpaRepository<StockInDetail, StockInDetailId> {
}
