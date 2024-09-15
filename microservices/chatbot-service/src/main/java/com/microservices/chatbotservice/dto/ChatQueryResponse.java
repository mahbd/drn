package com.microservices.chatbotservice.dto;

import java.time.LocalDateTime;

public record ChatQueryResponse(Long id, Long userId, String query, String response, LocalDateTime createdAt) {
}