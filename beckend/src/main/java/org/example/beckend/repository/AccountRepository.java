package org.example.beckend.repository;

import org.example.beckend.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByUsername(String username);
    @Query("SELECT a FROM Account a WHERE a.id <> :id")
    List<Account> findAllExceptId(@Param("id") Long id);

    @Query("SELECT a FROM Account a WHERE a.id <> :id")
    Page<Account> findAllExceptId(@Param("id") Long id, Pageable pageable);

}
