package com.microservices.userservice.dto;

public record RegisterBody(Long id, String email, String password, String role) {
}
