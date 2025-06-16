package org.example.backend.repository.automation;

import org.example.backend.entity.automation.Enhance;
import org.example.backend.entity.automation.TypeCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TypeCustomerRepository extends JpaRepository<TypeCustomer, Long> {
    Optional<TypeCustomer> findTypeCustomersByName(String name);
}
