package com.codesquad.todo.exeption;

public class UnauthorizedException extends BaseException {
  public UnauthorizedException() {
    super("로그인이 필요합니다");
  }
}
