package com.microservices.othersservice.userService;


public record UserResponse(Long id, String email, Role role) {
}
