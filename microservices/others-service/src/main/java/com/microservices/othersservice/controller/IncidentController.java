package com.microservices.othersservice.controller;

import com.microservices.othersservice.dto.IncidentRequest;
import com.microservices.othersservice.dto.IncidentResponse;
import com.microservices.othersservice.service.IncidentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/incidents")
public class IncidentController {
    private final IncidentService incidentService;

    @PostMapping
    public ResponseEntity<IncidentResponse> createIncident(@RequestBody IncidentRequest incidentRequest) {
        IncidentResponse incidentResponse = incidentService.createIncident(incidentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(incidentResponse);
    }

    @GetMapping
    public ResponseEntity<List<IncidentResponse>> getAllIncidents() {
        List<IncidentResponse> incidents = incidentService.getAllIncidents();
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable Long id) {
        IncidentResponse incidentResponse = incidentService.getIncidentById(id);
        if (incidentResponse != null) {
            return ResponseEntity.ok(incidentResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncidentResponse> updateIncident(@RequestBody IncidentRequest incidentRequest, @PathVariable Long id) {
        IncidentResponse incidentResponse = incidentService.updateIncident(incidentRequest, id);
        return ResponseEntity.ok(incidentResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
}
