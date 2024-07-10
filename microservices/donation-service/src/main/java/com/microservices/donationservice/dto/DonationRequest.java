package com.microservices.donationservice.dto;

public record DonationRequest (Long userId, Long amount) {
}