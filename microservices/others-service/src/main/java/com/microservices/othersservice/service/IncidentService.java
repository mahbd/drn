package com.microservices.othersservice.service;

import com.microservices.othersservice.dto.IncidentRequest;
import com.microservices.othersservice.dto.IncidentResponse;
import com.microservices.othersservice.model.Incident;
import com.microservices.othersservice.repository.IncidentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class IncidentService {
    private final IncidentRepository incidentRepository;

    public IncidentResponse createIncident(IncidentRequest incidentRequest) {
        Incident incident = new Incident();
        incident.setReportedBy(incidentRequest.reportedBy());
        incident.setIncidentType(incidentRequest.incidentType());
        incident.setAssignedVolunteers(incidentRequest.assignedVolunteers());
        incident.setLatitude(incidentRequest.latitude());
        incident.setLongitude(incidentRequest.longitude());
        incident.setDescription(incidentRequest.description());

        incident = incidentRepository.save(incident);
        return new IncidentResponse(
                incident.getId(),
                incident.getReportedBy(),
                incident.getIncidentType(),
                incident.getAssignedVolunteers(),
                incident.getLatitude(),
                incident.getLongitude(),
                incident.getDescription(),
                incident.getCreatedAt()
        );
    }

    public List<IncidentResponse> getAllIncidents() {
        return incidentRepository.findAll().stream()
                .map(incident -> new IncidentResponse(
                        incident.getId(),
                        incident.getReportedBy(),
                        incident.getIncidentType(),
                        incident.getAssignedVolunteers(),
                        incident.getLatitude(),
                        incident.getLongitude(),
                        incident.getDescription(),
                        incident.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public IncidentResponse getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .map(incident -> new IncidentResponse(
                        incident.getId(),
                        incident.getReportedBy(),
                        incident.getIncidentType(),
                        incident.getAssignedVolunteers(),
                        incident.getLatitude(),
                        incident.getLongitude(),
                        incident.getDescription(),
                        incident.getCreatedAt()
                ))
                .orElse(null);
    }

    public IncidentResponse updateIncident(IncidentRequest incidentRequest, Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found"));
        incident.setReportedBy(incidentRequest.reportedBy());
        incident.setIncidentType(incidentRequest.incidentType());
        incident.setAssignedVolunteers(incidentRequest.assignedVolunteers());
        incident.setLatitude(incidentRequest.latitude());
        incident.setLongitude(incidentRequest.longitude());
        incident.setDescription(incidentRequest.description());
        incidentRepository.save(incident);
        return new IncidentResponse(
                incident.getId(),
                incident.getReportedBy(),
                incident.getIncidentType(),
                incident.getAssignedVolunteers(),
                incident.getLatitude(),
                incident.getLongitude(),
                incident.getDescription(),
                incident.getCreatedAt()
        );
    }

    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }
}
