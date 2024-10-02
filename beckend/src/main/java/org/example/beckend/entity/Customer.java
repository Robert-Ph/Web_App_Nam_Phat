package org.example.beckend.entity;


import jakarta.persistence.*;
import lombok.*;

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
}
