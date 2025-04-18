package org.example.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.entity.enums.TypeOrder;
import org.example.backend.validation.EnumValid;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    @NotNull(message = "vat  is require")
    double vat;

    @EnumValid(enumClass = TypeOrder.class, message = "type order must be one of:INDIVIDUAL | BUSINESS ")
    String typeOrder;

    @NotNull(message = "phone  is require")
    @NotEmpty(message = "phone is not emtry")
    String phone;

    @NotNull(message = "address  is require")
    @NotEmpty(message = "address is not emtry")
    String address;


    List<OrderItemRequest> orderItems;
}
