package com.codesquad.todo.exeption;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.utill.ErrorMessages;
import io.jsonwebtoken.SignatureException;
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

  @ExceptionHandler(NotFoundData.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ResponseBody
  public ApiResponse handleError(NotFoundData notFoundData) {
    return notFoundData.returnErrorMessage();
  }

  @ExceptionHandler(SignatureException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public ApiResponse handleError(SignatureException e) {
    return new ApiResponse(ErrorMessages.ERROR, e.getMessage());
  }

  @ExceptionHandler(IndexOutOfBoundsException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ResponseBody
  public ApiResponse handleError(IndexOutOfBoundsException e) {
    return new ApiResponse(ErrorMessages.ERROR, ErrorMessages.NOTFOUND_CARD_SECTION);
  }
}
