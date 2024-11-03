package org.example.beckend.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInDetailRequest {
    Long productId;
    ProductRequest product;

    @NotNull(message = "Quanlity  is require")
    int quanlity;

    @NotNull(message = "Price Import  is require")
    int priceImport;

}
