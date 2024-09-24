package com.microservices.donationservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Arrays;
import java.util.Map;

@Aspect
@Component
public class UserService {
    private static final ThreadLocal<UserResponse> currentUser = new ThreadLocal<>();
    private static Boolean debug = false;

    @Around("@annotation(requiresRole)")
    public Object checkRole(ProceedingJoinPoint joinPoint, RequiresRole requiresRole) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            if (debug) {
                System.err.println("Authorization header is missing");
            }
            var response = Map.of("message", "Authorization header is missing");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Role[] expectedRoles = requiresRole.value();

        UserResponse user = getUser(authorizationHeader);
        if (user == null) {
            var response = Map.of("message", "Failed to authenticate");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!Arrays.asList(expectedRoles).contains(user.role())) {
            var response = Map.of("message", "You are not authorized to perform this action");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        currentUser.set(user);
        try {
            return joinPoint.proceed();
        } finally {
            currentUser.remove();
        }
    }

    public UserResponse getUser(String authHeaderString) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeaderString);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        String userURL = "http://localhost:8081/api/users/verify";
        try {
            ResponseEntity<Object> response = restTemplate.exchange(userURL, HttpMethod.POST, entity, Object.class);
            if (response.getStatusCode() != HttpStatus.OK) {
                if (debug) {
                    System.err.println("Status code: " + response.getStatusCode());
                }
                return null;
            }
            var body = response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            try {
                return mapper.convertValue(body, UserResponse.class);
            } catch (Exception e) {
                if (debug) {
                    System.err.println("Error converting body to UserResponse: " + e.getMessage());
                }
                return null;
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                if (debug) {
                    System.err.println("Unauthorized");
                }
                return null;
            }
            throw e;
        }
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface RequiresRole {
        Role[] value();
    }

    public record UserResponse(Long id, String name, String email, Role role) {
    }

    public enum Role {
        ADMIN,
        CITIZEN,
        VOLUNTEER,
        DONOR
    }

    public static UserResponse getCurrentUser() {
        return currentUser.get();
    }

    public static void clearCurrentUser() {
        currentUser.remove();
    }
}
