package com.microservices.chatbotservice;

import com.microservices.chatbotservice.dto.ChatQueryRequest;
import com.microservices.chatbotservice.dto.ChatQueryResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chatbot")
public class ChatQueryController {
    private final ChatQueryService chatQueryService;

    @PostMapping
    @UserService.RequiresRole({UserService.Role.CITIZEN, UserService.Role.ADMIN, UserService.Role.VOLUNTEER, UserService.Role.DONOR})
    public ResponseEntity<ChatQueryResponse> createChatQuery(@RequestBody ChatQueryRequest chatQueryRequest) {
        ChatQueryResponse chatQueryResponse = chatQueryService.createChatQuery(chatQueryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(chatQueryResponse);
    }

    @GetMapping
    public ResponseEntity<List<ChatQueryResponse>> getAllChatQueries() {
        List<ChatQueryResponse> chatQueries = chatQueryService.getAllChatQueries();
        return ResponseEntity.ok(chatQueries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatQueryResponse> getChatQueryById(@PathVariable Long id) {
        ChatQueryResponse chatQueryResponse = chatQueryService.getChatQueryById(id);
        if (chatQueryResponse != null) {
            return ResponseEntity.ok(chatQueryResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
