package com.microservices.userservice.dto;

public record UserResponse(Long id, String email, Role role) {
}
