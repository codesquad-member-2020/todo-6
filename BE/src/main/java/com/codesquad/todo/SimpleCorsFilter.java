package com.codesquad.todo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SimpleCorsFilter implements Filter {
    private final Logger log = LoggerFactory.getLogger(SimpleCorsFilter.class);

    public SimpleCorsFilter() {
        log.info("SimpleCORSFilter init");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}
    //웹 컨테이너(톰캣)이 시작될 때 필터 최초 한 번 인스턴스 생성

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        log.info("origin header : " + request.getHeader("Origin"));
//        response.setHeader("Access-Control-Allow-Origin", "*"); //일케 해줘도 되남
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, X-Requested-With, remember-me");
//        chain.doFilter(req, res);
        log.info("##### filter - before #####");
        chain.doFilter(request, response);
        log.info("##### filter - after #####");
    }
    //클라이언트의 요청 시 전/후 처리
    //FilterChain을 통해 전달

    @Override
    public void destroy() {
        log.info("destroy CORSFilter");
    }
    //필터 인스턴스가 제거될 때 실행되는 메서드, 종료하는 기능
}
