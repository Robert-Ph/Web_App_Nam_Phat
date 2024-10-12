package org.example.beckend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.beckend.entity.enums.StatusProcessing;

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

    private double capacity;

    @Enumerated(EnumType.STRING)
    private StatusProcessing status;

    @ManyToOne
    @JoinColumn(name="account_id", nullable=false, updatable=false)
    private Account account;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }
}
