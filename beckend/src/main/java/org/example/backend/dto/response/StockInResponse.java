package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInResponse {

    private Long id;

    private LocalDateTime dateCreate;

    private String supplier;

    private Long totalPrice;

    private String imageInvoice;
    List<StockInDetailResponse> listStockInDetails;
}
