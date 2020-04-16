package com.codesquad.todo.dto;

import com.codesquad.todo.domain.Card;
import com.codesquad.todo.domain.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CardDto {
  private Long id;
  private String title;
  private String contents;
  private String user;

  public CardDto(){}

  public CardDto(Card card, User user) {
    this.id = card.getId();
    this.title = card.getTitle();
    this.contents = card.getContents();
    this.user = user.getUserId();
  }
}
