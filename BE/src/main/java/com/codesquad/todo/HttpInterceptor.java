package com.codesquad.todo;

import com.codesquad.todo.domain.User;
import com.codesquad.todo.exeption.UnauthorizedException;
import com.codesquad.todo.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class HttpInterceptor implements HandlerInterceptor {
    private final Logger log = LoggerFactory.getLogger(SimpleCorsFilter.class);

    @Autowired
    private JwtService jwtService;

    private String secretKey = "PizzaIsBest";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equals("OPTIONS")) {
            log.info("options 메서드는 통과");
            return true;
        }

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
