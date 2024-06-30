package com.microservices.alertservice.dto;

public record AlertRequest(String type, String location, String severity, String description, Boolean isActive) {
}
