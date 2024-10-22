package org.example.beckend.repository;

import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByTypeCustomerContains(String phone);
    Optional<Customer> findByPhone(String phone);

    List<Customer> findByPhoneContains(String phone);

    @Query("SELECT o FROM Customer o WHERE (:filter IS NULL  OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.fullName LIKE %:filter% OR o.phone LIKE %:filter% OR o.email LIKE %:filter%))")
    Page<Customer> findFilter(@Param("filter") String filter, Pageable pageable);
}
