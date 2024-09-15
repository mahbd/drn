package com.microservices.othersservice.dto;

import java.util.List;

public record EvacuationRouteRequest(String routeName, List<RoutePointRequest> routePoints) {
}