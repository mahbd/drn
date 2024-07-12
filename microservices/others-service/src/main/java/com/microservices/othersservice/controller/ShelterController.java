package com.microservices.othersservice.controller;

import com.microservices.othersservice.dto.ShelterRequest;
import com.microservices.othersservice.dto.ShelterResponse;
import com.microservices.othersservice.service.ShelterService;
import com.microservices.othersservice.userService.RequiresRole;
import com.microservices.othersservice.userService.Role;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/shelters")
public class ShelterController {
    private final ShelterService shelterService;

    @PostMapping
    @RequiresRole(Role.ADMIN)
    public ResponseEntity<ShelterResponse> createShelter(@RequestBody ShelterRequest shelterRequest) {
        ShelterResponse shelterResponse = shelterService.createShelter(shelterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(shelterResponse);
    }

    @GetMapping
    public ResponseEntity<List<ShelterResponse>> getAllShelters() {
        List<ShelterResponse> shelters = shelterService.getAllShelters();
        return ResponseEntity.ok(shelters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShelterResponse> getShelterById(@PathVariable Long id) {
        ShelterResponse shelterResponse = shelterService.getShelterById(id);
        if (shelterResponse != null) {
            return ResponseEntity.ok(shelterResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @RequiresRole(Role.ADMIN)
    public ResponseEntity<ShelterResponse> updateShelter(@RequestBody ShelterRequest shelterRequest, @PathVariable Long id) {
        ShelterResponse shelterResponse;
        try {
            shelterResponse = shelterService.updateShelter(shelterRequest, id);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(shelterResponse);
    }

    @DeleteMapping("/{id}")
    @RequiresRole(Role.ADMIN)
    public ResponseEntity<Void> deleteShelter(@PathVariable Long id) {
        shelterService.deleteShelter(id);
        return ResponseEntity.noContent().build();
    }
}
