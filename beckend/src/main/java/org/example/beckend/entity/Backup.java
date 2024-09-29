package org.example.beckend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "backup")
public class Backup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime dateCreate;

    private int capacity;

    @ManyToOne
    @JoinColumn(name="account_id", nullable=false, updatable=false)
    private Account account;
    @Lob
    private byte[] data;
    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }
}
