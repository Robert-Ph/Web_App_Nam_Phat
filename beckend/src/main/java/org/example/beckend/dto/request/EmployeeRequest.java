package org.example.beckend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.beckend.contains.PositionName;
import org.example.beckend.validation.EnumValid;
import org.example.beckend.validation.ValidEmail;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class EmployeeRequest {
     @NotNull(message = "Fullname  is require")
     @NotEmpty(message = "Fullname is not emtry")
     String fullName;

     LocalDate work_date;

     @NotNull(message = "Phone  is require")
     @NotEmpty(message = "Phone is not emtry")
     String phone;

     @ValidEmail(message = "Email not format")
     String email;

     @NotNull(message = "Wage  is require")
     int wage;

     @NotNull(message = "isWork is not null")
     boolean isWork;

     @NotNull(message = "Position  is require")
     @NotEmpty(message = "Position is not emtry")
     @EnumValid(enumClass = PositionName.class, message = "Permission must be one of:INTERN | OFFICIAL ")
     String position;
}
