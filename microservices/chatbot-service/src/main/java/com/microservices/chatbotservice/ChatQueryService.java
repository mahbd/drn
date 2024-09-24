package com.microservices.chatbotservice;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.microservices.chatbotservice.UserService.UserResponse;
import com.microservices.chatbotservice.dto.ChatQueryRequest;
import com.microservices.chatbotservice.dto.ChatQueryResponse;
import com.microservices.chatbotservice.dto.ShelterResponse;
import com.microservices.chatbotservice.dto.gemini.ContentItem;
import com.microservices.chatbotservice.dto.gemini.GeminiRequest;
import com.microservices.chatbotservice.dto.gemini.GeminiResponse;
import com.microservices.chatbotservice.dto.gemini.PartItem;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatQueryService {
        private RestTemplate restTemplate;

        private final ChatQueryRepository chatQueryRepository;

        private String getShelterList() {
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Not needed");
                HttpEntity<?> entity = new HttpEntity<>(headers);
                String userURL = "http://localhost:8084/api/shelters";

                try {
                        ResponseEntity<Object> response = restTemplate.exchange(userURL, HttpMethod.GET, entity,
                                        Object.class);
                        if (response.getStatusCode() != HttpStatus.OK) {
                                return "Response status is " + response.getStatusCode();
                        }
                        var body = response.getBody();
                        ObjectMapper mapper = new ObjectMapper();
                        mapper.registerModule(new JavaTimeModule());
                        try {
                                List<ShelterResponse> shelterResponses = mapper.convertValue(body,
                                                new TypeReference<List<ShelterResponse>>() {
                                                });
                                StringBuilder responseBuilder = new StringBuilder();
                                responseBuilder.append("Here are the available shelters:\n");
                                for (ShelterResponse shelterResponse : shelterResponses) {
                                        responseBuilder.append("Name: ").append(shelterResponse.name());
                                        responseBuilder.append("\nAddress: ").append(shelterResponse.address());
                                        responseBuilder.append("\nPhone: ").append(shelterResponse.phone());
                                        responseBuilder.append("\n\n");
                                }
                                return responseBuilder.toString();
                        } catch (Exception e) {
                                System.err.println(e);
                                return "Failed to parse response";
                        }
                } catch (HttpClientErrorException e) {
                        if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                                return "Authorization failed";
                        }
                        throw e;
                }
        }

        private String getChatResponse(ContentItem contentItemRequest) {
                String chatQueryUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key="
                                + System.getenv("GEMINI_API_KEY");
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

        public ChatQueryResponse createChatQuery(ChatQueryRequest chatQueryRequest, UserResponse user) {
                PartItem partItemRequest = new PartItem(chatQueryRequest.query());
                PartItem userPart = new PartItem("My name is: " + user.name());
                String shelters = getShelterList();
                PartItem shelterList = new PartItem(shelters);
                PartItem smallAnswer = new PartItem("Please provide answer as small as possible.");
                ContentItem contentItemRequest = new ContentItem(
                                List.of(userPart, shelterList, partItemRequest, smallAnswer));

                ChatQuery chatQuery = new ChatQuery();
                chatQuery.setUserId(user.id());
                chatQuery.setQuery(chatQueryRequest.query());
                chatQuery.setResponse(getChatResponse(contentItemRequest));

                chatQuery = chatQueryRepository.save(chatQuery);
                return new ChatQueryResponse(
                                chatQuery.getId(),
                                chatQuery.getUserId(),
                                chatQuery.getQuery(),
                                chatQuery.getResponse(),
                                chatQuery.getCreatedAt());
        }

        public List<ChatQueryResponse> getAllChatQueries(Long userId) {
                return chatQueryRepository.findAllByUserId(userId).stream()
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
