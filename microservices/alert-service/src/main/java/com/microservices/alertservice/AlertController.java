package com.microservices.alertservice;

import com.microservices.alertservice.dto.AlertRequest;
import com.microservices.alertservice.dto.AlertResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/alerts")
public class AlertController {
    private final AlertService alertService;

    @GetMapping
    public ResponseEntity<List<AlertResponse>> getAllAlerts() {

        List<AlertResponse> allAlerts = alertService.getAllAlerts();
        return ResponseEntity.ok(allAlerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlertResponse> getAllAlert(@PathVariable Long id) {
        AlertResponse alert = alertService.getAlertById(id);
        if (alert != null) {
            return ResponseEntity.ok(alert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Object> createAlert(@RequestBody AlertRequest alertRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alertService.createAlert(alertRequest));
    }

    @PutMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Object> updateAlert(@PathVariable Long id, @RequestBody Alert alert) {
        Alert updatedAlert = alertService.updateAlert(id, alert);

        if (updatedAlert != null) {
            return ResponseEntity.ok(updatedAlert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Object> deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
        return ResponseEntity.noContent().build();
    }
}
