package com.microservices.alertservice.dto;

import java.time.LocalDateTime;

public record AlertResponse(Long id, String type, String location, String severity, String description,
                            Boolean isActive, LocalDateTime createdAt) {
}
