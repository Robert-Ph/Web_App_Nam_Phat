package org.example.beckend.dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.entity.Employee;

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
