package org.example.beckend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.contains.Permission;
import org.example.beckend.validation.EnumValid;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRequest {

    @NotNull(message = "Username  is require")
    @NotEmpty(message = "Username is not emtry")
    String username;

    @NotNull(message = "Password is require")
    @NotEmpty(message = "Password is not emtry")
    String password;

    @NotNull(message = "Permission require")
    @NotEmpty(message = "Permission is not emtry")
    @EnumValid(enumClass = Permission.class, message = "Permission must be one of:USER | ADMIN ")
    String permission;

    @NotNull(message = "Id Employee is require")

    Long employeeId;

}
