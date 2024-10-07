package org.example.beckend.dto.response;

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

    Long total_price;
    String status;

    LocalDateTime dateCreate;
    LocalDateTime dateShip;

    String typeOrder;
    String nameCustomer;

    boolean isPay;

    double vat;



}
