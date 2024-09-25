package org.example.beckend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.dto.request.ProductRequest;
import org.example.beckend.entity.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryReponse {

    Product product;
    int quanlity;
}
