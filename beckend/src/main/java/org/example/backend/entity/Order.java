package org.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.entity.enums.OrderStatus;
import org.example.backend.entity.enums.TypeOrder;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@ToString
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    Long totalPrice;

    @Enumerated(EnumType.STRING)
    OrderStatus status;

    double vat;
    Long reduce;

    LocalDateTime dateCreate;

    LocalDateTime dateShip;

    LocalDateTime datePayment;

    @Enumerated(EnumType.STRING)
    TypeOrder typeOrder;

    boolean isPay;

    @Lob
    String address;

    String phone;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<OrderItem> orderItems;

    @ManyToOne
    @JoinColumn(name = "cusomer_id", nullable = true)
//    @JsonBackReference
    Customer customer;

    boolean isNew;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }


}
