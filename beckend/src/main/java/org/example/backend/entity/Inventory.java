package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id",unique = true,nullable = false)
    private Product product;

    private int quanlity;

    private LocalDateTime lastDateIn;


    @PrePersist
    protected void onCreate() {
        lastDateIn = LocalDateTime.now();
    }

}
