package org.example.backend.repository;

import org.example.backend.entity.Inventory;
import org.example.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Inventory findByProduct(Product product);

    @Query("SELECT o FROM Inventory o WHERE (:filter IS NULL OR :filter = '' OR (CAST(o.product.price AS string) LIKE %:filter% OR o.product.name LIKE %:filter% OR o.product.type LIKE %:filter% OR  CAST(o.product.id  AS string ) LIKE %:filter% ))")
    Page<Inventory> findInventoriesByProductNameOrProductIdOrProductType(@Param("filter") String filter, Pageable pageable);
}
