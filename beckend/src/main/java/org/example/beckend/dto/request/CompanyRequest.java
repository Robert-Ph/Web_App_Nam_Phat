package org.example.beckend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyRequest {

    @NotEmpty(message = "Name is not emtry")
    @NotEmpty(message = "Name is require")
    String name;

    String idTax;

    @NotEmpty(message = "Phone is not emtry")
    @NotEmpty(message = "Phone is require")
    String phone;

    String idBank;

    @NotEmpty(message = "Address is not emtry")
    @NotEmpty(message = "Address is require")
    private String address;
}
