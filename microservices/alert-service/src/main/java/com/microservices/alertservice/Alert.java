package com.microservices.alertservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alerts_seq")
    @SequenceGenerator(name = "alerts_seq")
    private Long id;
    private String type;
    private String location;
    private String severity;
    private String description;
    private Boolean isActive;
    @CreatedDate
    private LocalDateTime createdAt;
}
