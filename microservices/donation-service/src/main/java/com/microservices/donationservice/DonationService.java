package com.microservices.donationservice;

import com.microservices.donationservice.dto.DonationResponse;
import com.microservices.donationservice.dto.DonationRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DonationService {
    private final DonationRepository donationRepository;

    public List<DonationResponse> getAllDonations() {
        return donationRepository.findAll().stream()
                .map(donation -> new DonationResponse(donation.getId(), donation.getUserId(), donation.getAmount(),
                        donation.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public Donation getDonationById(Long id) {
        return donationRepository.findById(id).orElse(null);
    }

    public DonationResponse createDonation(DonationRequest donationRequest) {
        Donation donation = new Donation();
        donation.setUserId(donationRequest.userId());
        donation.setAmount(donationRequest.amount());
        donation = donationRepository.save(donation);
        return new DonationResponse(donation.getId(), donation.getUserId(), donation.getAmount(),
                donation.getCreatedAt());
    }

    public Donation updateDonation(Long id, Donation donation) {
        if (donationRepository.existsById(id)) {
            donation.setId(id);
            return donationRepository.save(donation);
        }
        return null;
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}