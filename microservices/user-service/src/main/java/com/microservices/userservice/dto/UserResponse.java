package com.microservices.userservice.dto;

public record UserResponse(Long id, String name, String email, Role role) {
}
