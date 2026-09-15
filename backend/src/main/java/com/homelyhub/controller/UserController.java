package com.homelyhub.controller;

import com.homelyhub.dto.UserDto;
import com.homelyhub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        String email = authentication.getName();
        UserDto profile = userService.getUserProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(Authentication authentication, @RequestBody UserDto userDto) {
        String email = authentication.getName();
        UserDto updated = userService.updateUserProfile(email, userDto);
        return ResponseEntity.ok(updated);
    }
}
