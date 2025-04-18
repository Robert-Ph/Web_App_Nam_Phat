package org.example.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.validation.ValidEmail;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyRequest {

    @NotNull(message = "name is require")
    @NotEmpty(message = "name is not emtry")
    String name;

    String idTax;

    @NotNull(message = "phone is require")
    @NotEmpty(message = "phone is not emtry")
    String phone;

    String idBank;

    @ValidEmail(message = "Email not format")
    @NotNull(message = "email is require")
    @NotEmpty(message = "email is not emtry")
    String email;

    @NotNull(message = "address is require")
    @NotEmpty(message = "address is not emtry")
    private String address;
}
