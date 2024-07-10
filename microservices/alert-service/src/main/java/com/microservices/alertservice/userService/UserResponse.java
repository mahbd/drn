package com.microservices.alertservice.userService;


public record UserResponse(Long id, String email, Role role) {
}
