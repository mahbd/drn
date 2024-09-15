package com.microservices.chatbotservice.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartItem {
    @JsonProperty("text")
    private final String text;
    public PartItem(String text) {
        this.text = text;
    }

    // Don't delete otherwise jackson will not deserialize
    public PartItem() {
        this.text = null;
    }
}
