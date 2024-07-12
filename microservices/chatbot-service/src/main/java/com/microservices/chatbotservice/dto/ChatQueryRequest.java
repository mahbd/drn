package com.microservices.chatbotservice.dto;

public record ChatQueryRequest(Long userId, String query) {
}
