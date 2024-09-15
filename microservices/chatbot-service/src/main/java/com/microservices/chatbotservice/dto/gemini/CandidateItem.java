package com.microservices.chatbotservice.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidateItem {
    @JsonProperty("content")
    ContentItem content;
}
