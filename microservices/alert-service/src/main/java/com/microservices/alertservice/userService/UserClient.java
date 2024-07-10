package com.microservices.alertservice.userService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserClient {
    @RequestMapping(method = RequestMethod.POST, value = "/api/users/verify")
    ResponseEntity<Object> getUser(@RequestHeader("Authorization") String authorizationHeader);
}
