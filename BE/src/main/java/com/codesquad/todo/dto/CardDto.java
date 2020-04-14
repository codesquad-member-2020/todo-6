package com.codesquad.todo.dto;

import com.codesquad.todo.domain.Card;
import com.codesquad.todo.domain.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CardDto {
  private Long id;
  private String title;
  private String contents;
  private String user;

  public CardDto(Card card, User user) {
    this.id = card.getId();
    this.title = card.getTitle();
    this.contents = card.getContents();
    this.user = user.getUserId();
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public void setUser(String user) {
    this.user = user;
  }
}
