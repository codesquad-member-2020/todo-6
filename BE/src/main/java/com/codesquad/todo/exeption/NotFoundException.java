package com.codesquad.todo.exeption;

public class NotFoundException extends BaseException {
  public NotFoundException(String errorMessage) {
    super(errorMessage);
  }
}
