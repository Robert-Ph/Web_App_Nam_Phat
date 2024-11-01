package org.example.beckend.repository;

import org.example.beckend.dto.response.InventoryReponse;
import org.example.beckend.entity.Inventory;
import org.example.beckend.entity.Invoice;
import org.example.beckend.entity.Product;
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
