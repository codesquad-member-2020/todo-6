package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ApiResponse {
  private String status;
  private Object data;

  public ApiResponse(String status, Object data) {
    this.status = status;
    this.data = data;
  }
}
