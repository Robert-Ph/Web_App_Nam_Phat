package org.example.beckend.dto.request;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInRequest {
    @NotNull(message = "Supplier is not null")
    @NotEmpty(message = "Supplier is require")
    String supplier;


    @NotNull(message = "totalPrice  is require")
    Long totalPrice;

    List<StockInDetailRequest> listStockInDetails;

}
