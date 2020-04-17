package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Embedded;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class User {
  @Id
  private Long id;
  private String userId;

  public void setId(Long id) {
    this.id = id;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public Long getId() {
    return this.id;
  }

  public String getUserId() {
    return this.userId;
  }

  public boolean isMatchWithUserId(String userId) {
      return this.userId.equals(userId);
  }
}
