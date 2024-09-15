package com.microservices.donationservice;

import com.microservices.donationservice.UserService.UserResponse;
import com.microservices.donationservice.dto.DonationRequest;
import com.microservices.donationservice.dto.DonationResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService donationService;

    @GetMapping
    public ResponseEntity<Object> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getDonationById(@PathVariable Long id) {
        Donation donation = donationService.getDonationById(id);

        if (donation != null) {
            return ResponseEntity.ok(donation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @UserService.RequiresRole({ UserService.Role.DONOR, UserService.Role.CITIZEN, UserService.Role.ADMIN,
            UserService.Role.VOLUNTEER })
    public ResponseEntity<Object> createDonation(@RequestBody DonationRequest donationRequest) {
        UserResponse currentUser = UserService.getCurrentUser();
        donationRequest = new DonationRequest(currentUser.id(), donationRequest.amount());
        DonationResponse donationResponse = donationService.createDonation(donationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(donationResponse);
    }

    @PutMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Object> updateDonation(@PathVariable Long id, @RequestBody Donation donation) {
        Donation updatedDonation = donationService.updateDonation(id, donation);

        if (updatedDonation != null) {
            return ResponseEntity.ok(updatedDonation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @UserService.RequiresRole({ UserService.Role.ADMIN })
    public ResponseEntity<Object> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
