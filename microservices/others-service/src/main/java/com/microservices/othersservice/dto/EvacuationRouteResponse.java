package com.microservices.othersservice.dto;

import java.time.LocalDateTime;
import java.util.List;

public record EvacuationRouteResponse(Long id, String routeName, List<RoutePointResponse> routePoints, LocalDateTime createdAt) {
}
