package com.microservices.othersservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "route_points")
public class RoutePoint {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "route_point_seq")
    @SequenceGenerator(name = "route_point_seq")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "route_id")
    private EvacuationRoute evacuationRoute;
    private String latitude;
    private String longitude;
}
