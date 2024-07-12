package com.microservices.chatbotservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity
@Table(name = "chat_queries")
public class ChatQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_query_seq")
    @SequenceGenerator(name = "chat_query_seq")
    private Long id;
    private Long userId;
    private String query;
    @Column(columnDefinition = "TEXT")
    private String response;
    @CreatedDate
    private java.time.LocalDateTime createdAt;
}
