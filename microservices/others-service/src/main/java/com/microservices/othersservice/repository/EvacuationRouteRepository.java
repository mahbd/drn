package com.microservices.othersservice.repository;

import com.microservices.othersservice.model.EvacuationRoute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvacuationRouteRepository extends JpaRepository<EvacuationRoute, Long> {
}