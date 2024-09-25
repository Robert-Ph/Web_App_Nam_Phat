package org.example.beckend.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import jakarta.validation.Valid;
import lombok.*;
import org.example.beckend.contains.Permission;
import org.example.beckend.validation.EnumValid;

import java.util.UUID;

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

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee employee;
}
