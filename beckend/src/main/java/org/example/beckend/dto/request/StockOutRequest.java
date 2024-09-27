package org.example.beckend.dto.request;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockOutRequest {

    @NotNull(message = "productId  is require")
    Long productId;

    @NotNull(message = "quanlity  is require")
    @Min(value = 1,message = "quantity must greater than 0")
    int quantity;

    @NotNull(message = "reson is not null")
    @NotEmpty(message = "reson is require")
    String reson;

}
