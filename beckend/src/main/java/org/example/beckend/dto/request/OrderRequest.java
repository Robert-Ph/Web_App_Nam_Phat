package org.example.beckend.dto.request;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.enums.PositionName;
import org.example.beckend.entity.enums.TypeOrder;
import org.example.beckend.validation.EnumValid;

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

    String comments;
    Long discount;


    List<OrderItemRequest> orderItems;
}
