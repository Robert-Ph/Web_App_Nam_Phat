package org.example.beckend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.beckend.entity.embeddable.StockInDetailId;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
@Table(name = "stock_in_detail")
public class StockInDetail {
    @EmbeddedId
    private StockInDetailId id;

    @ManyToOne
    @MapsId("stockInId")
    @JoinColumn(name = "stockInId",nullable = false)
    private StockIn stockIn;

    @OneToOne
    @MapsId("productId")
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    private int quanlity;

    private int newPrice;
}
