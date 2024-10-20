package org.example.beckend.repository;

import org.example.beckend.entity.Account;
import org.example.beckend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByUsername(String username);

    Optional<Account> findByEmployee(Employee employee);
    @Query("SELECT a FROM Account a WHERE a.id <> :id")
    List<Account> findAllExceptId(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.id <> :id")
    Page<Account> findAllExceptId(@Param("id") Long id, Pageable pageable);

    @Query("SELECT o FROM Account o WHERE (:filter IS NULL  OR :filter = '' OR (CAST(o.employee.id AS string) LIKE %:filter% OR o.username LIKE %:filter%))")
    Page<Account> findFilter(@Param("filter") String filter, Pageable pageable);

}
