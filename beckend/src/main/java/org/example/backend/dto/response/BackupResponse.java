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
public class BackupResponse {

    Long id;

    LocalDateTime dateCreate;

    double capacity;

    String status;

    String username;
}
