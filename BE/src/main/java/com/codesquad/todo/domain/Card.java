package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Card {
  @Id
  private int id;
  private String content;
  private boolean deleted;
  private User user;
}
