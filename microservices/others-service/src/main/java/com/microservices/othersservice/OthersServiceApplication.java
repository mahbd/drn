package com.microservices.othersservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OthersServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OthersServiceApplication.class, args);
    }

}
