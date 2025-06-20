package org.example.backend.dto.request.automation;

import lombok.*;
import lombok.experimental.FieldDefaults;


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
