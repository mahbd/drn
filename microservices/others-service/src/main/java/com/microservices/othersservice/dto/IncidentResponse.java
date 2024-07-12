package com.microservices.othersservice.dto;

import java.time.LocalDateTime;
import java.util.List;

public record IncidentResponse(Long id, Long reportedBy, String incidentType, List<Long> assignedVolunteers, String latitude, String longitude, String description, LocalDateTime createdAt) {
}
