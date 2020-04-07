package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Activity {
  @Id
  private int id;
  private String action;
  private String source;
  private String destination;
  private Card card;
  private User user;
}
