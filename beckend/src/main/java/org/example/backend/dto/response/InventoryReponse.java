package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.entity.Product;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryReponse {

    Product product;
    int quanlity;
    LocalDateTime lastDateIn;
}
