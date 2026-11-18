package com.zoho.CareerTrack.Service;
import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;

@Service 
public class JwtService {
    private final String SECRET_KEY ="my-career-track-secret-key-123456789";
    private final long EXPIRATION_TIME =1000*60*60;
    private Key getKey() {
    return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
     } 
    public String generateToken(String email){
        
        return Jwts.builder()
            .subject(email)
            .expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
            .signWith(getKey())
            .compact();
    }
    public String extractEmail(String token){
        return Jwts.parser()
              .verifyWith((SecretKey)getKey())
              .build()
              .parseSignedClaims(token)
              .getPayload()
              .getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parser()
                   .verifyWith((SecretKey)getKey())
                   .build()
                   .parseSignedClaims(token);
                   return true;
        }catch(Exception e){
            return  false;
        }
    }
     
}
