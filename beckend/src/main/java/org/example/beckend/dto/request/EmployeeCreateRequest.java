package org.example.beckend.dto.request;

import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.validation.ValidEmail;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class EmployeeCreateRequest {
     String fullName;
     LocalDate work_date;
     String phone;

     @ValidEmail
     String email;
     int wage;
}
