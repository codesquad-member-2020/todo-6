package com.codesquad.todo.exeption;

import com.codesquad.todo.domain.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CustomAdvice {

  @ExceptionHandler(UnauthorizedException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public ApiResponse handleError(UnauthorizedException unauthorized) {
    return unauthorized.returnErrorMessage();
  }

  @ExceptionHandler(NotFoundException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public ApiResponse handleError(NotFoundException notFound) {
    return notFound.returnErrorMessage();
  }
}
