package com.microservices.chatbotservice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "chat_queries")
@EntityListeners(AuditingEntityListener.class)
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
    @Column(updatable = false)
    private java.time.LocalDateTime createdAt;
}
