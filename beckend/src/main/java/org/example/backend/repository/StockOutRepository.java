package org.example.backend.repository;

import org.example.backend.entity.StockOut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockOutRepository extends JpaRepository<StockOut,Long> {
    @Query("SELECT o FROM StockOut o WHERE (:filter IS NULL OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.product.name LIKE %:filter% OR   o.product.type LIKE %:filter% OR   o.product.unit LIKE %:filter% " +
            "OR   o.reson LIKE %:filter%))")
    Page<StockOut> findStockOutByFilter(@Param("filter") String filter, Pageable pageable);
}
