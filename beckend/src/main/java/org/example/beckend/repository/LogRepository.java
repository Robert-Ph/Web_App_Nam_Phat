package org.example.beckend.repository;

import org.example.beckend.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface LogRepository extends JpaRepository<Log,Long> {
    void deleteByDateCreateLessThan(LocalDateTime dateTime);
}
