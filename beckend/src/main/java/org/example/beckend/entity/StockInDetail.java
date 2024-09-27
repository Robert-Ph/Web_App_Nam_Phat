package org.example.beckend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private StockIn stockIn;

    @OneToOne
    @MapsId("productId")
    private Product product;

    private int quanlity;

    private int priceImport;
}
