package org.example.beckend.entity.embeddable;

import jakarta.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
@Embeddable
public class StockInDetailId implements Serializable {
    private Long stockInId;
    private Long productId;
}
