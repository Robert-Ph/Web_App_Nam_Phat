package org.example.backend.repository.automation;

import org.example.backend.entity.automation.DieCutting;
import org.example.backend.entity.automation.Enhance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnhanceRepository extends JpaRepository<Enhance, Long> {
    Optional<Enhance> findEnhanceByName(String name);
}
