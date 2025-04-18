package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.entity.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInDetailResponse {
    Product product;

    int quanlity;

    int priceImport;


}
