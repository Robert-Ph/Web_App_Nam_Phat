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
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    LocalDateTime dateCreate;

    @Lob
    String messsage;

    @ManyToOne
    @JoinColumn(name="account_id", nullable=false, updatable=false)
    Account account;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }
}
