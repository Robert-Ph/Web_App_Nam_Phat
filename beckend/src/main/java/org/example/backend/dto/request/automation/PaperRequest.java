package org.example.backend.dto.request.automation;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.entity.enums.Permission;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PaperRequest {

    String name;
    int height;
    int weight;
    Long oneColorPrintPrice;
    Long twoColorPrintPrice;
    Long onePrintPrice;
    Long twoPrintPrice;
}
