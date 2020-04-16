package com.codesquad.todo.service;

import com.codesquad.todo.domain.User;
import com.codesquad.todo.domain.UserRepository;
import com.codesquad.todo.exeption.NotFoundData;
import com.codesquad.todo.exeption.UnauthorizedException;
import com.codesquad.todo.utill.ErrorMessages;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Autowired
    private UserRepository userRepository;

    public User getTokenFromJwtString(String jwtTokenString, String signingKey) throws InterruptedException {
        Claims claims = Jwts.parser()
                .setSigningKey(signingKey.getBytes())
                .parseClaimsJws(jwtTokenString)
                .getBody();

        String userId = claims.get("userId", String.class);
        Long id = claims.get("id", Long.class);

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundData(ErrorMessages.NOTFOUND_USER));
        if(!user.isMatchWithUserId(userId)){
            throw new UnauthorizedException();
        }

        return user;
    }

}
