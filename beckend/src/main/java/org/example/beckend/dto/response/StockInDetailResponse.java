package org.example.beckend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.Product;

import java.util.List;

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
