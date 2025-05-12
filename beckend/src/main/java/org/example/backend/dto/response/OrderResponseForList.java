package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponseForList {
    Long id;

    Long totalPrice;
    String status;

    LocalDateTime dateCreate;
    LocalDateTime dateShip;
    LocalDateTime datePayment;

    String typeOrder;
    String nameCustomer;

    boolean isPay;

    double vat;



}
