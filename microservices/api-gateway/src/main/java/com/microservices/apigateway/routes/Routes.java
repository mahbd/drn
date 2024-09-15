package com.microservices.apigateway.routes;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class Routes {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // Apply to all paths

        return new CorsWebFilter(source);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("users", r -> r.path("/api/users/**")
                        .uri("http://localhost:8081"))
                .route("alerts", r -> r.path("/api/alerts/**")
                        .uri("http://localhost:8082"))
                .route("donations", r -> r.path("/api/donations/**")
                        .uri("http://localhost:8083"))
                .route("evacuation-routes", r -> r.path("/api/evacuation-routes/**")
                        .uri("http://localhost:8084"))
                .route("incidents", r -> r.path("/api/incidents/**")
                        .uri("http://localhost:8084"))
                .route("shelters", r -> r.path("/api/shelters/**")
                        .uri("http://localhost:8084"))
                .route("chatbot", r -> r.path("/api/chatbot/**")
                        .uri("http://localhost:8085"))
                .build();
    }
}
