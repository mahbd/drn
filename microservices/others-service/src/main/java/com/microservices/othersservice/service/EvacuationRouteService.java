package com.microservices.othersservice.service;

import com.microservices.othersservice.dto.EvacuationRouteRequest;
import com.microservices.othersservice.dto.EvacuationRouteResponse;
import com.microservices.othersservice.dto.RoutePointResponse;
import com.microservices.othersservice.model.EvacuationRoute;
import com.microservices.othersservice.model.RoutePoint;
import com.microservices.othersservice.repository.EvacuationRouteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EvacuationRouteService {
    private final EvacuationRouteRepository evacuationRouteRepository;

    public EvacuationRouteResponse createEvacuationRoute(EvacuationRouteRequest evacuationRouteRequest) {
        EvacuationRoute evacuationRoute = new EvacuationRoute();
        evacuationRoute.setRouteName(evacuationRouteRequest.routeName());
        EvacuationRoute finalEvacuationRoute = evacuationRoute;
        evacuationRoute.setRoutePoints(
                evacuationRouteRequest.routePoints().stream()
                        .map(pointRequest -> {
                            RoutePoint point = new RoutePoint();
                            point.setLatitude(pointRequest.latitude());
                            point.setLongitude(pointRequest.longitude());
                            point.setEvacuationRoute(finalEvacuationRoute);
                            return point;
                        })
                        .collect(Collectors.toList())
        );

        evacuationRoute = evacuationRouteRepository.save(evacuationRoute);

        return new EvacuationRouteResponse(
                evacuationRoute.getId(),
                evacuationRoute.getRouteName(),
                evacuationRoute.getRoutePoints().stream()
                        .map(point -> new RoutePointResponse(point.getId(), point.getLatitude(), point.getLongitude()))
                        .collect(Collectors.toList()),
                evacuationRoute.getCreatedAt()
        );
    }

    public List<EvacuationRouteResponse> getAllEvacuationRoutes() {
        return evacuationRouteRepository.findAll().stream()
                .map(route -> new EvacuationRouteResponse(
                        route.getId(),
                        route.getRouteName(),
                        route.getRoutePoints().stream()
                                .map(point -> new RoutePointResponse(point.getId(), point.getLatitude(), point.getLongitude()))
                                .collect(Collectors.toList()),
                        route.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public EvacuationRouteResponse getEvacuationRouteById(Long id) {
        return evacuationRouteRepository.findById(id)
                .map(route -> new EvacuationRouteResponse(
                        route.getId(),
                        route.getRouteName(),
                        route.getRoutePoints().stream()
                                .map(point -> new RoutePointResponse(point.getId(), point.getLatitude(), point.getLongitude()))
                                .collect(Collectors.toList()),
                        route.getCreatedAt()
                ))
                .orElse(null);
    }

    public void updateEvacuationRoute(Long id, EvacuationRouteRequest evacuationRouteRequest) {
        evacuationRouteRepository.findById(id)
                .ifPresent(evacuationRoute -> {
                    evacuationRoute.setRouteName(evacuationRouteRequest.routeName());
                    evacuationRoute.setRoutePoints(
                            evacuationRouteRequest.routePoints().stream()
                                    .map(pointRequest -> {
                                        RoutePoint point = new RoutePoint();
                                        point.setLatitude(pointRequest.latitude());
                                        point.setLongitude(pointRequest.longitude());
                                        point.setEvacuationRoute(evacuationRoute);
                                        return point;
                                    })
                                    .collect(Collectors.toList())
                    );
                    evacuationRouteRepository.save(evacuationRoute);
                });
    }

    public void deleteEvacuationRoute(Long id) {
        evacuationRouteRepository.deleteById(id);
    }
}
