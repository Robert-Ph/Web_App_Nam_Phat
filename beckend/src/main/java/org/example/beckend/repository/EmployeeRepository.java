package org.example.beckend.repository;

import org.example.beckend.entity.Account;
import org.example.beckend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    @Query("SELECT o FROM Employee o WHERE (:filter IS NULL  OR :filter = '' OR (CAST(o.id AS string) LIKE %:filter% OR o.fullName LIKE %:filter% OR o.phone LIKE %:filter% OR o.email LIKE %:filter%))")
    Page<Employee> findFilter(@Param("filter") String filter, Pageable pageable);

}
