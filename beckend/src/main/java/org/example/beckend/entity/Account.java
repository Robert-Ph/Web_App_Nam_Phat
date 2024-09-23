package org.example.beckend.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    private String username;
    private String password;
    private String  permission;
    private boolean status;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee employee;
}
