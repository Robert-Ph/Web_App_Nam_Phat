package org.example.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotNull(message = "Username is require")
    @NotEmpty(message = "Username is not emtry")
    String username;
    @NotNull(message = "Pasword is require")
    @NotEmpty(message = "Pasword is not emtry")
    String password;
}
