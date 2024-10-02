package org.example.beckend.dto.request;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class CustomerRequest {

    @NotNull(message = "Fullname  is require")
    @NotEmpty(message = "Fullname is not emtry")
    String fullName;

    @NotNull(message = "Phone  is require")
    @NotEmpty(message = "Phone is not emtry")
    String phone;

    String email;

    @NotNull(message = "Address  is require")
    @NotEmpty(message = "Address is not emtry")
   String address;

    @NotNull(message = "Tyoe customer  is require")
    @NotEmpty(message = "Type customer is not emtry")
    String typeCustomer;
}
