package org.example.beckend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.enums.PositionName;
import org.example.beckend.validation.EnumValid;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {

    double vat;

    @EnumValid(enumClass = PositionName.class, message = "type order must be one of:INDIVIDUAL | BUSINESS ")
    String typeOrder;
    String phone;

    List<OrderItemRequest> orderItems;
}
