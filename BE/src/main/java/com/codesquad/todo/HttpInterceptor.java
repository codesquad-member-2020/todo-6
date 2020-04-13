package com.codesquad.todo;

import com.codesquad.todo.domain.User;
import com.codesquad.todo.exeption.UnauthorizedException;
import com.codesquad.todo.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class HttpInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    private String secretKey = "PizzaIsBest";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String jwtTokenString = request.getHeader("Authorization");

        if(jwtTokenString != null) {
            String token = jwtTokenString.replace("Bearer ", "");
            User user = jwtService.getTokenFromJwtString(token, secretKey);
            request.setAttribute("user", user);
            return true;
        }

        throw new UnauthorizedException();
    }
}
