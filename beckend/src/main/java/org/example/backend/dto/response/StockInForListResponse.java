package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInForListResponse {

    Long id;

    LocalDateTime dateCreate;

    String supplier;

    Long totalPrice;

    String imageInvoice;


}
