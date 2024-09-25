package org.example.beckend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.beckend.contains.Unit;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private int heigth;
    private int weigth;

    private String unit;
    private String type;
    private int price;


}
