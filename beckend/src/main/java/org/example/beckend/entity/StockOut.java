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
@ToString
@Table(name = "stock_out")
public class StockOut {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="product_id", nullable=false, updatable=false)
    private Product product;

    private int quantity;

    private LocalDateTime dateCreate;

    @Lob
    private String reson;
    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }
}
