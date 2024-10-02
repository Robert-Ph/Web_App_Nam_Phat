package org.example.beckend.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;



@Embeddable
public class StockInDetailId implements Serializable {
    private Long stockInId;

    @Column(nullable = false, name = "product_id")
    private Long productId;

    public Long getStockInId() {
        return stockInId;
    }

    public void setStockInId(Long stockInId) {
        this.stockInId = stockInId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
