package com.microservices.alertservice;

import com.microservices.alertservice.dto.AlertRequest;
import com.microservices.alertservice.dto.AlertResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        return new AlertResponse(alert.getId().toString(), alert.getType(), alert.getLocation(), alert.getSeverity(),
                alert.getDescription(), alert.getIsActive(), alert.getCreatedAt());
    }
}
