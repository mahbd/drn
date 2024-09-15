package com.microservices.othersservice.controller;

import com.microservices.othersservice.UserService;
import com.microservices.othersservice.dto.EvacuationRouteRequest;
import com.microservices.othersservice.dto.EvacuationRouteResponse;
import com.microservices.othersservice.service.EvacuationRouteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/evacuation-routes")
public class EvacuationRouteController {
    private final EvacuationRouteService evacuationRouteService;

    @GetMapping
    public ResponseEntity<List<EvacuationRouteResponse>> getAllEvacuationRoutes() {
        List<EvacuationRouteResponse> evacuationRoutes = evacuationRouteService.getAllEvacuationRoutes();
        return ResponseEntity.ok(evacuationRoutes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvacuationRouteResponse> getEvacuationRouteById(@PathVariable Long id) {
        EvacuationRouteResponse evacuationRouteResponse = evacuationRouteService.getEvacuationRouteById(id);
        if (evacuationRouteResponse != null) {
            return ResponseEntity.ok(evacuationRouteResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<EvacuationRouteResponse> createEvacuationRoute(
            @RequestBody EvacuationRouteRequest evacuationRouteRequest) {
        EvacuationRouteResponse evacuationRouteResponse = evacuationRouteService
                .createEvacuationRoute(evacuationRouteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(evacuationRouteResponse);
    }

    @PutMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Void> updateEvacuationRoute(@PathVariable Long id,
            @RequestBody EvacuationRouteRequest evacuationRouteRequest) {
        evacuationRouteService.updateEvacuationRoute(id, evacuationRouteRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Void> deleteEvacuationRoute(@PathVariable Long id) {
        evacuationRouteService.deleteEvacuationRoute(id);
        return ResponseEntity.noContent().build();
    }
}
