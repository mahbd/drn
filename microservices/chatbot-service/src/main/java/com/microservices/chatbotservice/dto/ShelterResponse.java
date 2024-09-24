package com.microservices.chatbotservice.dto;

import java.time.LocalDateTime;

public record ShelterResponse(Long id, String name, String address, String latitude, String longitude, String phone,
        LocalDateTime createdAt) {
}