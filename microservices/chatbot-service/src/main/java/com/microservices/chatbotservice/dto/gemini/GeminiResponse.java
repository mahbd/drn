package com.microservices.chatbotservice.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GeminiResponse {
    @JsonProperty("candidates")
    List<CandidateItem> candidates;
}

