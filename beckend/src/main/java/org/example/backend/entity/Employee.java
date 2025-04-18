package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;
    private LocalDate work_date;
    private String phone;
    private String email;
    private int wage;

    private boolean isWork;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;


}
