package com.zoho.CareerTrack.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zoho.CareerTrack.Model.User;
import com.zoho.CareerTrack.Model.UserRequest;
import com.zoho.CareerTrack.Service.UserService;

@RestController 
@RequestMapping ("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/register")
    public ResponseEntity<User>registerUser(@RequestBody User user){
        User savedUser=userService.registerUser(user);
        return new ResponseEntity<>(savedUser,HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserRequest request){
        String token=userService.loginUser(
            request.getEmail(),
            request.getPassword()
        );
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", request.getEmail());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
