package org.example.beckend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.beckend.entity.enums.LogLevel;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    LocalDateTime dateCreate;


    @Enumerated(EnumType.STRING)
    LogLevel level;

    @Lob
    String messsage;



    @ManyToOne
    @JoinColumn(name="account_id", nullable=true, updatable=false)
    Account account;

    @PrePersist
    protected void onCreate() {
        dateCreate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Log{" +
                id +
                "----" + dateCreate +
                "----" + level +
                "----'" + messsage + '\'' +
                "----" + account.getUsername() +
                '}';
    }


}
