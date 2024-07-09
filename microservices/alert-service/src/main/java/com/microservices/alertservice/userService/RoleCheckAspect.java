package com.microservices.alertservice.userService;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Map;

@Aspect
@Component
@AllArgsConstructor
public class RoleCheckAspect {
    private final UserClient userClient;

    @Around("@annotation(requiresRole)")
    public Object checkRole(ProceedingJoinPoint joinPoint, RequiresRole requiresRole) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String authorizationHeader = request.getHeader("Authorization");
        Role expectedRole = requiresRole.value();

        UserResponse user = getUser(authorizationHeader);
        if (user == null) {
            var response = Map.of("message", "Failed to authenticate " + expectedRole);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        System.out.println("Actual Role: " + user.role().toString());
        System.out.println("Expected Role:" + expectedRole.toString());
        if (!user.role().toString().equals(expectedRole.toString())) {
            var response = Map.of("message", "You are not authorized to perform this action");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return joinPoint.proceed();
    }

    private UserResponse getUser(String authorizationHeader) {
        ResponseEntity<Object> verifyResponse = userClient.getUser(authorizationHeader);
        if(verifyResponse.getStatusCode() != HttpStatus.OK){
            return null;
        }
        var body = verifyResponse.getBody();
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.convertValue(body, UserResponse.class);
        } catch (Exception e) {
            return null;
        }
    }
}
