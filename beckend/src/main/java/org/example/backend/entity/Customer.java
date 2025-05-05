package org.example.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;


    private String fullName;
    private String phone;
    private String email;
    private String tax;
    private String address;
    private String typeCustomer;
    private boolean active;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
//    @JsonManagedReference
    @JsonIgnore
    private List<Order> listOrder;
}
