package com.microservices.othersservice.dto;

public record ShelterRequest(String name, String address, String latitude, String longitude, String phone) {
}
