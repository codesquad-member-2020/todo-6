package com.codesquad.todo.domain;

public class ApiResponse {
  private String status;
  private Object data;

  public ApiResponse(String status, Object data) {
    this.status = status;
    this.data = data;
  }
}
