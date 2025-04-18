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
public class LogResponse {

    private Long id;

    LocalDateTime dateCreate;

    String level;

    String messsage;

    String userName;

}
