package org.example.beckend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@ToString
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne()
    @JoinColumn(name = "order_id")
    @JsonBackReference
    Order order;

    String nameProduct;
    String typeProduct;
    String unitProduct;
    int heightProudct;
    int widthProduct;
    int quanlityProduct;

    String typePaper;
    int qualityPaper;
    String unitPaper;
    int heightPaper;
    int widthPaper;

    String laminnation; //Can mang
    boolean cradle; //Be

    int pricePerOne;
    String mode;

}
