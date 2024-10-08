package com.microservices.othersservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "evacuation_routes")
@EntityListeners(AuditingEntityListener.class)
public class EvacuationRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ev_route_seq")
    @SequenceGenerator(name = "ev_route_seq")
    private Long id;
    private String routeName;
    @OneToMany(mappedBy = "evacuationRoute", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<RoutePoint> routePoints;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
