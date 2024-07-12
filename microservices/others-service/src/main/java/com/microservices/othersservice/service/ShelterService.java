package com.microservices.othersservice.service;

import com.microservices.othersservice.dto.ShelterRequest;
import com.microservices.othersservice.dto.ShelterResponse;
import com.microservices.othersservice.model.Shelter;
import com.microservices.othersservice.repository.ShelterRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShelterService {
    private final ShelterRepository shelterRepository;

    public ShelterResponse createShelter(ShelterRequest shelterRequest) {
        Shelter shelter = new Shelter();
        return getShelterResponse(shelterRequest, shelter);
    }

    public List<ShelterResponse> getAllShelters() {
        return shelterRepository.findAll().stream()
                .map(shelter -> new ShelterResponse(
                        shelter.getId(),
                        shelter.getName(),
                        shelter.getAddress(),
                        shelter.getLatitude(),
                        shelter.getLongitude(),
                        shelter.getPhone(),
                        shelter.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public ShelterResponse getShelterById(Long id) {
        return shelterRepository.findById(id)
                .map(shelter -> new ShelterResponse(
                        shelter.getId(),
                        shelter.getName(),
                        shelter.getAddress(),
                        shelter.getLatitude(),
                        shelter.getLongitude(),
                        shelter.getPhone(),
                        shelter.getCreatedAt()
                ))
                .orElse(null);
    }

    public ShelterResponse updateShelter(ShelterRequest shelterRequest, Long id) throws ChangeSetPersister.NotFoundException {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        return getShelterResponse(shelterRequest, shelter);
    }

    private ShelterResponse getShelterResponse(ShelterRequest shelterRequest, Shelter shelter) {
        shelter.setName(shelterRequest.name());
        shelter.setAddress(shelterRequest.address());
        shelter.setLatitude(shelterRequest.latitude());
        shelter.setLongitude(shelterRequest.longitude());
        shelter.setPhone(shelterRequest.phone());
        shelter = shelterRepository.save(shelter);
        return new ShelterResponse(
                shelter.getId(),
                shelter.getName(),
                shelter.getAddress(),
                shelter.getLatitude(),
                shelter.getLongitude(),
                shelter.getPhone(),
                shelter.getCreatedAt()
        );
    }

    public void deleteShelter(Long id) {
        shelterRepository.deleteById(id);
    }
}
