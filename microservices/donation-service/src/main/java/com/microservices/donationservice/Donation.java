package com.microservices.donationservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "donations")
@EntityListeners(AuditingEntityListener.class)
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "donations_seq")
    @SequenceGenerator(name = "donations_seq")
    private Long id;
    private Long userId;
    private Long amount;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
