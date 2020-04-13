package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotEmpty;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Card {
  @Id
  private Long id;
  @NotEmpty
  @Length(max=500)
  private String title;
  @Length(max=500)
  private String contents;
  private Long user;

  public void setId(Long id) {
    this.id = id;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public void setUser(Long user) {
    this.user = user;
  }
}
