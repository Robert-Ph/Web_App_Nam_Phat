package org.example.backend.dto.request.automation;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TypeCutomerRequest {
    String name;
    double precentage;
}
