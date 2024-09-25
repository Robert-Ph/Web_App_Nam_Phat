package org.example.beckend.repository;

import org.example.beckend.entity.Inventory;
import org.example.beckend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Inventory findByProduct(Product product);
}
