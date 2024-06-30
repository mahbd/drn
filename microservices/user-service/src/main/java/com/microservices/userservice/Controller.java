package com.microservices.userservice;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.microservices.userservice.dto.LoginBody;
import com.microservices.userservice.dto.RegisterBody;
import com.microservices.userservice.dto.UserResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class Controller {
    private static final Logger log = LoggerFactory.getLogger(Controller.class);
    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;

    private final UserService userService;

    public Controller(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterBody registerBody) {
        User user = userService.registerUser(registerBody);
        if (user == null) {
            return "User already exists";
        }
        return createJwtToken(user);
    }

    private String createJwtToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(86400);
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);
            return JWT.create()
                    .withIssuer("drn")
                    .withClaim("id", user.getId())
                    .withClaim("email", user.getEmail())
                    .withClaim("role", user.getRole())
                    .withIssuedAt(Date.from(now))
                    .withExpiresAt(Date.from(expiry))
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException(exception);
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginBody loginBody) {
        User user = userService.loginUser(loginBody);
        if (user == null) {
            return "User does not exist";
        }
        return createJwtToken(user);
    }

    @PostMapping("/verify")
    public ResponseEntity<Object> verify(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header is missing");
        }
        String token = authorizationHeader.substring(7);
        DecodedJWT decodedJWT;
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("drn")
                    .build();
            decodedJWT = verifier.verify(token);
            Long userId = decodedJWT.getClaim("id").asLong();
            UserResponse userResponse = userService.getUserById(userId);
            if (userResponse == null) {
                var body = Map.of("message", "User does not exist");
                return ResponseEntity.ok().body(body);
            }
            return ResponseEntity.ok(userResponse);
        } catch (JWTVerificationException exception){
            var body = Map.of("message", "Invalid token");
            return ResponseEntity.ok().body(body);
        }
    }
}
