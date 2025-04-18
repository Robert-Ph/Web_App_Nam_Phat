package org.example.backend.repository;

import org.example.backend.entity.StockIn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockInRepository extends JpaRepository<StockIn,Long> {
    @Query("SELECT o FROM StockIn o WHERE (:filter IS NULL OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.supplier LIKE %:filter% OR   CAST(o.dateCreate  AS string ) LIKE %:filter% ))")
    Page<StockIn> findInventoriesByFilter(@Param("filter") String filter, Pageable pageable);
}
