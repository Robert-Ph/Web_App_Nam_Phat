package org.example.beckend.repository;

import org.example.beckend.entity.Invoice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

    @Query("SELECT o FROM Invoice o WHERE (:filter IS NULL OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.order.customer.fullName LIKE %:filter% OR  CAST(o.order.id  AS string ) LIKE %:filter% ))")
    Page<Invoice> findByIdOrNameCustomerOrOrderIdContains(@Param("filter") String filter, Pageable pageable);
}
