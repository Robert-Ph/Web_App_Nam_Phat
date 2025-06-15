package org.example.backend.entity.automation;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "paperauto")
public class Paper {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int height;
    private int weight;
    private Long oneColorPrintPrice;
    private Long twoColorPrintPrice;
    private Long onePrintPrice;
    private Long twoPrintPrice;
}
