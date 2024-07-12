package com.microservices.othersservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "incident_seq")
    @SequenceGenerator(name = "incident_seq")
    private Long id;
    private Long reportedBy;
    private String incidentType;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> assignedVolunteers;
    private String latitude;
    private String longitude;
    private String description;
    @CreatedDate
    private java.time.LocalDateTime createdAt;
}
