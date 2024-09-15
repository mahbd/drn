package com.microservices.chatbotservice;

import com.microservices.chatbotservice.dto.ChatQueryRequest;
import com.microservices.chatbotservice.dto.ChatQueryResponse;
import com.microservices.chatbotservice.dto.gemini.ContentItem;
import com.microservices.chatbotservice.dto.gemini.GeminiRequest;
import com.microservices.chatbotservice.dto.gemini.GeminiResponse;
import com.microservices.chatbotservice.dto.gemini.PartItem;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatQueryService {
    private RestTemplate restTemplate;

    private final ChatQueryRepository chatQueryRepository;

    private String getChatResponse(String query) {
        String chatQueryUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key="
                + System.getenv("GEMINI_API_KEY");
        PartItem partItemRequest = new PartItem(query);
        PartItem userPart = new PartItem("Name: Mahmudul Alam, Address: Shibganj, Chapainawabganj, Age: 25");
        ContentItem contentItemRequest = new ContentItem(List.of(userPart, partItemRequest));
        GeminiRequest request = new GeminiRequest(List.of(contentItemRequest));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<GeminiResponse> response = restTemplate.exchange(chatQueryUrl, HttpMethod.POST, entity,
                GeminiResponse.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            return "Sorry, I'm not able to answer your question at the moment. Please try again later. Status: "
                    + response.getStatusCode();
        }
        GeminiResponse geminiResponse = response.getBody();
        if (geminiResponse == null) {
            return "Sorry, I'm not able to answer your question at the moment. Please try again later.";
        }
        StringBuilder responseBuilder = new StringBuilder();
        geminiResponse.getCandidates().forEach(candidateItem -> candidateItem.getContent().getParts()
                .forEach(partItem -> responseBuilder.append(partItem.getText())));
        return responseBuilder.toString();
    }

    public ChatQueryResponse createChatQuery(ChatQueryRequest chatQueryRequest) {
        ChatQuery chatQuery = new ChatQuery();
        chatQuery.setUserId(chatQueryRequest.userId());
        chatQuery.setQuery(chatQueryRequest.query());
        chatQuery.setResponse(getChatResponse(chatQueryRequest.query()));
        // chatQuery.setResponse("Working offline");

        chatQuery = chatQueryRepository.save(chatQuery);
        return new ChatQueryResponse(
                chatQuery.getId(),
                chatQuery.getUserId(),
                chatQuery.getQuery(),
                chatQuery.getResponse(),
                chatQuery.getCreatedAt());
    }

    public List<ChatQueryResponse> getAllChatQueries() {
        return chatQueryRepository.findAll().stream()
                .map(chatQuery -> new ChatQueryResponse(
                        chatQuery.getId(),
                        chatQuery.getUserId(),
                        chatQuery.getQuery(),
                        chatQuery.getResponse(),
                        chatQuery.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public ChatQueryResponse getChatQueryById(Long id) {
        return chatQueryRepository.findById(id)
                .map(chatQuery -> new ChatQueryResponse(
                        chatQuery.getId(),
                        chatQuery.getUserId(),
                        chatQuery.getQuery(),
                        chatQuery.getResponse(),
                        chatQuery.getCreatedAt()))
                .orElse(null);
    }
}
