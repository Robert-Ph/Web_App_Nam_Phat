package org.example.beckend.entity;

import jakarta.persistence.*;

import lombok.*;
import org.example.beckend.entity.enums.Permission;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    private String username;
    private String password;

//    @EnumValid(enumClass = Permission.class)
//    private String permission;
    @Enumerated(EnumType.STRING)
    private Permission permission;


    private boolean status;

    private LocalDateTime dateCreate;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee employee;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }
}
