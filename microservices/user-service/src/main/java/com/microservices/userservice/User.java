package com.microservices.userservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
    @SequenceGenerator(name = "users_seq")
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String name;
    @Column(nullable = true)
    private String phone;
    private String address;
    @Column(nullable = true)
    private String gpsLat;
    @Column(nullable = true)
    private String gpsLong;
    private String role;
}
