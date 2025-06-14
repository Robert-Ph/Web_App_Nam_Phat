package org.example.backend.repository.automation;

import org.example.backend.entity.automation.Paper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PagerRepository extends JpaRepository<Paper, Long> {
    Optional<Paper> findByName(String name);
}
