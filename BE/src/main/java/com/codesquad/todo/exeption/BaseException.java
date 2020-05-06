package com.codesquad.todo.exeption;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.utill.ErrorMessages;

public class BaseException extends RuntimeException {
  private String errorMessage;

  public BaseException(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public ApiResponse returnErrorMessage() {
    return new ApiResponse(ErrorMessages.ERROR, errorMessage);
  }
}
