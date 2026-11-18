package com.zoho.CareerTrack.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.zoho.CareerTrack.Model.User;
import com.zoho.CareerTrack.Repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService=jwtService;
    }

    // public User registerUser(User user) {

    //     String encodedPassword =
    //             passwordEncoder.encode(user.getPassword());

    //     user.setPassword(encodedPassword);

    //     user.setRole("USER");

    //     return userRepository.save(user);
    // }
    public User registerUser(User user) {
        
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        throw new RuntimeException("Email is already registered");
    }

    String encodedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    user.setRole("USER");
    return userRepository.save(user);
}

    public String loginUser(String email,String password){
        User user=userRepository.findByEmail(email)
        .orElseThrow(()->new RuntimeException("User not found"));

        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
     return jwtService.generateToken(user.getEmail());
    }
}
