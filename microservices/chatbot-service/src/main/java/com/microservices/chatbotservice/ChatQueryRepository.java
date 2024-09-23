package com.microservices.chatbotservice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatQueryRepository extends JpaRepository<ChatQuery, Long> {
    List<ChatQuery> findAllByUserId(Long userId);
}
