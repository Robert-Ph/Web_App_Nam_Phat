package org.example.beckend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
@Table(name = "stock_in")
public class StockIn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime dateCreate;

    private String supplier;

    private Long totalPrice;

    private String imageInvoice;

    @OneToMany(mappedBy = "stockIn",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<StockInDetail> listStockInDetails;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }

}
