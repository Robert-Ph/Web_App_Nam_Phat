package org.example.beckend.repository;

import org.example.beckend.entity.Backup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BackupRepository extends JpaRepository<Backup,Long> {
    @Query("SELECT b FROM Backup b ORDER BY b.dateCreate DESC LIMIT 1")
    Backup findLatestBackup();
}
