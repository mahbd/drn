package com.microservices.donationservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alerts_seq")
    @SequenceGenerator(name = "alerts_seq")
    private Long id;
    private Long userId;
    private Long amount;
    @CreatedDate
    private LocalDateTime createdAt;
}
