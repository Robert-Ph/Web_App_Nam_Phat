package org.example.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    @NotNull(message = "Name is not null")
    @NotEmpty(message = "Name is require")
    String name;

    @NotNull(message = "Heigth  is require")
    int heigth;
    @NotNull(message = "Heigth  is require")
    int weigth;

    @NotNull(message = "Unit is not null")
    @NotEmpty(message = "Unit is require")
    String unit;

    @NotNull(message = "Type is not null")
    @NotEmpty(message = "Type is require")
    String type;

    @NotNull(message = "Price  is require")
    int price;
}
