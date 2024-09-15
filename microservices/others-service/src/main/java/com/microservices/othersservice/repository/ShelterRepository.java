package com.microservices.othersservice.repository;

import com.microservices.othersservice.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShelterRepository extends JpaRepository<Shelter, Long> {
}
