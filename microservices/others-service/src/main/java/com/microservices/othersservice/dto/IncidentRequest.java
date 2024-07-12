package com.microservices.othersservice.dto;

import java.util.List;

public record IncidentRequest(Long reportedBy, String incidentType, List<Long> assignedVolunteers, String latitude, String longitude, String description) {
}
