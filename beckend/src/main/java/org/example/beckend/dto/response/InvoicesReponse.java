package org.example.beckend.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoicesReponse {
    Long id;

    Long orderId;

    LocalDateTime dateCreate;

    Long priceNeedPay;

    String nameCustomer;
}
