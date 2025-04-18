package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse {

    Long id;
    String username;
    String permission;
    boolean status;
    Long employeeId;
    LocalDateTime dateCreate;
}
