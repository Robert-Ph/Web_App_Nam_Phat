package org.example.beckend.dto.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.enums.Permission;

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
    @Enumerated(EnumType.STRING)
    private Permission permission;;

    @NotNull(message = "Id Employee is require")

    Long employeeId;

}
