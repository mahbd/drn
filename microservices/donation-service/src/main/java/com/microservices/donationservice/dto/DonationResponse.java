package com.microservices.donationservice.dto;

import java.time.LocalDateTime;

public record DonationResponse(Long id, Long userId, Long amount, LocalDateTime createdAt) {
}
