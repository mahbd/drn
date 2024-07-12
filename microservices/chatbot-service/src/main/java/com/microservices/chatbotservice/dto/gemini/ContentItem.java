package com.microservices.chatbotservice.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContentItem {
    @JsonProperty("parts")
    List<PartItem> parts;

    public ContentItem(List<PartItem> partItem) {
        this.parts = partItem;
    }

    // Don't delete otherwise jackson will not deserialize
    public ContentItem() {
        this.parts = null;
    }
}
