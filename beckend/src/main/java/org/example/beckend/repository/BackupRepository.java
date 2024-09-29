package org.example.beckend.repository;

import org.example.beckend.entity.Backup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BackupRepository extends JpaRepository<Backup,Long> {
}
