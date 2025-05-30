package org.example.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemRequest {

    String nameProduct;
    String typeProduct;
    String unitProduct;
    int heightProudct;
    int widthProduct;
    int quanlityProduct;

    String typePaper;
    int qualityPaper;
    String unitPaper;
    int heightPaper;
    int widthPaper;

    String laminnation; //Can mang
    boolean cradle; //Be

    int pricePerOne;
    String mode;
}
