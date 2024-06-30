package com.microservices.alertservice;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservices.alertservice.dto.AlertRequest;
import com.microservices.alertservice.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/alerts")
public class AlertController {
    private static final Logger log = LoggerFactory.getLogger(AlertController.class);
    private final UserClient userClient;
    private final AlertService alertService;

    private String getRole(String authorizationHeader) {
        ResponseEntity<Object> verifyResponse = userClient.getUser(authorizationHeader);
        if(verifyResponse.getStatusCode() != HttpStatus.OK){
            log.info("User verification failed");
            return null;
        }
        var body = verifyResponse.getBody();
        ObjectMapper mapper = new ObjectMapper();
        try {
            UserResponse userResponse = mapper.convertValue(body, UserResponse.class);
            return userResponse.role();
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping
    public ResponseEntity<Object> createAlert(@RequestBody AlertRequest alertRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String role = getRole(authorizationHeader);
        if (role == null) {
            var response = Map.of("message", "Failed to authenticate user");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if(!role.equals("admin")){
            var response = Map.of("message", "You are not authorized to perform this action");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(alertService.createAlert(alertRequest));
    }

}
