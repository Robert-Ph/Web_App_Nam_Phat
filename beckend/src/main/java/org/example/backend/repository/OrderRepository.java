package org.example.backend.repository;

import org.example.backend.entity.Order;
import org.example.backend.entity.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByIsPay(Boolean isPay);
    List<Order> findByCustomerId(Long customerId);

//    @Query("SELECT o FROM Order o WHERE CAST(o.id AS string)  LIKE %:filter% OR o.customer.fullName LIKE %:filter% AND o.isPay = :ispay")
//    Page<Order> findByIdOrNameCustomerContainsAndIsPay(@Param("filter") String filter,@Param("ispay")boolean ispay, Pageable pageable);
    @Query("SELECT o FROM Order o WHERE (:filter IS NULL OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.customer.fullName LIKE %:filter%)) AND o.isPay = :ispay")
    Page<Order> findByIdOrNameCustomerContainsAndIsPay(@Param("filter") String filter,@Param("ispay")boolean ispay, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE (:filter IS NULL  OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.customer.fullName LIKE %:filter%)) AND o.status = :status")
    Page<Order> findByIdOrNameCustomerContainsAndStatus(@Param("filter") String filter, @Param("status") OrderStatus status, Pageable pageable);


    @Query("SELECT o FROM Order o WHERE (:filter IS NULL  OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.customer.fullName LIKE %:filter%)) ")
    Page<Order> findByIdOrNameCustomerContains(@Param("filter") String filter, Pageable pageable);


}
