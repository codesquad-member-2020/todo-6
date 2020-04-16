package com.codesquad.todo.exeption;

import com.codesquad.todo.utill.ErrorMessages;

public class UnauthorizedException extends BaseException {
  public UnauthorizedException() {
    super(ErrorMessages.UNAUTHORIZED);
  }
}
