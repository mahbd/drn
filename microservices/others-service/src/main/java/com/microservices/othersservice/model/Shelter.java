package com.microservices.othersservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity
@Table(name = "shelters")
public class Shelter {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shelter_seq")
    @SequenceGenerator(name = "shelter_seq")
    private Long id;
    private String name;
    private String address;
    private String latitude;
    private String longitude;
    private String phone;
    @CreatedDate
    private java.time.LocalDateTime createdAt;
}
