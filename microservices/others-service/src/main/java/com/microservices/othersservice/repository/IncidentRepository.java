package com.microservices.othersservice.repository;

import com.microservices.othersservice.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
