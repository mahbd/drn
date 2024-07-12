package com.microservices.chatbotservice.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GeminiRequest {
    @JsonProperty("contents")
    List<ContentItem> contents;

    public GeminiRequest(List<ContentItem> contentItem) {
        this.contents = contentItem;
    }
}

