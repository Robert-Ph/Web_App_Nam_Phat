package org.example.beckend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String address;
    private String typeCustomer;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
//    @JsonManagedReference
    @JsonIgnore
    private List<Order> listOrder;
}
