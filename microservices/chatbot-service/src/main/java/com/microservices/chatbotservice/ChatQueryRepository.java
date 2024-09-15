package com.microservices.chatbotservice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatQueryRepository extends JpaRepository<ChatQuery, Long> {
}
