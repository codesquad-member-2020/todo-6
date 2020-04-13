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
  private String name;
  private List<Project> project;

  public void setId(Long id) {
    this.id = id;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setProject(List<Project> project) {
    this.project = project;
  }
}
