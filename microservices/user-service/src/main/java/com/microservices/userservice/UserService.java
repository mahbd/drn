package com.microservices.userservice;

import com.microservices.userservice.dto.LoginBody;
import com.microservices.userservice.dto.RegisterBody;
import com.microservices.userservice.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    private String hashPassword(String stringToHash) {
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        messageDigest.update(stringToHash.getBytes());
        return new String(messageDigest.digest());
    }

    public User registerUser(RegisterBody registerBody) {

        User user = new User();
        user.setEmail(registerBody.email());
        user.setRole("citizen");
        user.setPassword(hashPassword(registerBody.password()));

        try {
            User otherUser = userRepository.findByEmail(registerBody.email());
            log.info("User: {}", otherUser);
            if (otherUser == null) {
                log.info("User does not exist");
                User user1 = userRepository.save(user);
                log.info("User2: {}", user1);
                return user1;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public User loginUser(LoginBody loginBody) {
        User user = userRepository.findByEmail(loginBody.email());
        if (user == null) {
            return null;
        }
        String hashedPassword = hashPassword(loginBody.password());
        if (user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            return null;
        }
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        return new UserResponse(user.getId(), user.getEmail(), user.getRole());
    }

    public List <User> userList(){
        List<User> users = userRepository.findAll();
        return users;
    }
}
