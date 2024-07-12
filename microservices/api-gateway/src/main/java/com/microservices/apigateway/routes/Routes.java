package com.microservices.apigateway.routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class Routes {
    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return GatewayRouterFunctions.route("routing-service")
                .route(RequestPredicates.path("/api/users/**"), HandlerFunctions.http("http://localhost:8081"))
                .route(RequestPredicates.path("/api/alerts/**"), HandlerFunctions.http("http://localhost:8082"))
                .route(RequestPredicates.path("/api/donations/**"), HandlerFunctions.http("http://localhost:8083"))
                .route(RequestPredicates.path("/api/evacuation-routes/**"), HandlerFunctions.http("http://localhost:8084"))
                .build();
    }
}
