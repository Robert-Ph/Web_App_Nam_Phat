package org.example.beckend.dto.request;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.OrderItem;
import org.example.beckend.entity.enums.OrderStatus;
import org.example.beckend.entity.enums.TypeOrder;
import org.example.beckend.validation.EnumValid;

import java.time.LocalDateTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderUpdateRequest {

    @EnumValid(enumClass = OrderStatus.class, message = "status must be one of:DELIVERED | CONFIM | FISNISHED ")
    String status;

    @NotNull(message = "vat  is require")
    double vat;


    LocalDateTime dateShip;

    @EnumValid(enumClass = TypeOrder.class, message = "type order must be one of:INDIVIDUAL | BUSINESS ")
    String typeOrder;

    boolean isPay;

    @NotNull(message = "phone  is require")
    @NotEmpty(message = "phone is not emtry")
    String address;

    @NotNull(message = "address  is require")
    @NotEmpty(message = "address is not emtry")
    String phone;

    List<OrderItem> orderItems;
}
