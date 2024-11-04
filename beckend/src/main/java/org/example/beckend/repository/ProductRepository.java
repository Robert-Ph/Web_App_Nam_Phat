package org.example.beckend.repository;

import org.example.beckend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByNameContains(String name);

    @Query("SELECT p FROM Product p WHERE CAST(p.id AS string) LIKE %:filter% ")
    List<Product> findByIdPattern(@Param("filter") String filter);
}
