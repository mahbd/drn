package com.microservices.donationservice.userService;


public record UserResponse(Long id, String email, Role role) {
}
