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

  public void setUser(User user) {
    this.user = user.getId();
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getContents() {
    return contents;
  }

  public Long getUser() {
    return user;
  }

  public boolean isMatchId(Card card) {
    return this.id.equals(card.id);
  }
}
