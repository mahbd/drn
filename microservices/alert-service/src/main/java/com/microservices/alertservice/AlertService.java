package com.microservices.alertservice;

import com.microservices.alertservice.dto.AlertRequest;
import com.microservices.alertservice.dto.AlertResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AlertService {
    private final AlertRepository alertRepository;


    public AlertResponse createAlert(AlertRequest alertRequest){

        Alert alert = new Alert();
        alert.setType(alertRequest.type());
        alert.setLocation(alertRequest.location());
        alert.setSeverity(alertRequest.severity());
        alert.setDescription(alertRequest.description());
        alert.setIsActive(alertRequest.isActive());

        alert = alertRepository.save(alert);
        return new AlertResponse(alert.getId(), alert.getType(), alert.getLocation(), alert.getSeverity(),
                alert.getDescription(), alert.getIsActive(), alert.getCreatedAt());
    }


    public Alert updateAlert(Long id, Alert alert) {
        if (alertRepository.existsById(id)) {
            alert.setId(id);
            return alertRepository.save(alert);
        }

        return null;
    }

    public List<AlertResponse> getAllAlerts() {

        return alertRepository.findAll().stream()
                .map(alert -> new AlertResponse(alert.getId(), alert.getType(), alert.getLocation(), alert.getSeverity(), alert.getDescription(), alert.getIsActive(), alert.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public AlertResponse getAlertById(Long id) {
        return alertRepository.findById(id)
                .map(alert -> new AlertResponse(alert.getId(), alert.getType(), alert.getLocation(), alert.getSeverity(), alert.getDescription(), alert.getIsActive(), alert.getCreatedAt()))
                .orElse(null);
    }


    public void deleteAlert(Long id) {
        alertRepository.deleteById(id);
    }
}
