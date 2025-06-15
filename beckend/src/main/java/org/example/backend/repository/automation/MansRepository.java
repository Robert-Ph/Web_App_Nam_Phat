package org.example.backend.repository.automation;

import org.example.backend.entity.automation.Mans;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MansRepository extends JpaRepository<Mans, Long> {
    Optional<Mans> findMansByName(String name);
}
