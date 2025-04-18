package org.example.backend.dto.request;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInRequest {
    @NotNull(message = "Supplier is not null")
    @NotEmpty(message = "Supplier is require")
    String supplier;


    @NotNull(message = "totalPrice  is require")
    Long totalPrice;

    List<StockInDetailRequest> listStockInDetails;

}
