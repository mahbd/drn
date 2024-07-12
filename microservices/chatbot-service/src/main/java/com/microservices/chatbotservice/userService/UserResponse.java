package com.microservices.chatbotservice.userService;


public record UserResponse(Long id, String email, Role role) {
}
