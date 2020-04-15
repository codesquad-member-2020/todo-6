package com.codesquad.todo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.PATCH.name(),
                        HttpMethod.DELETE.name())
                .allowedHeaders("access-control-allow-origin", "*")
                .allowedHeaders("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT")
                .allowedHeaders("Access-Control-Max-Age", "3600")
                .allowedHeaders("Access-Control-Allow-Headers", "x-requested-with, origin, content-type, accept");
    }

    @Bean
    HttpInterceptor httpInterceptor() {
        return new HttpInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(httpInterceptor())
                .addPathPatterns("/api/column/**");
    }

}
