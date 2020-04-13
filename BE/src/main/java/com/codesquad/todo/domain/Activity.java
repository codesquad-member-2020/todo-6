package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Activity {
  @Id
  private Long id;
  private String action;
  private String source;
  private String destination;
  private String card;
  private LocalDateTime createAt;
  private Long user;

  public void setId(Long id) {
    this.id = id;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public void setCard(String card) {
    this.card = card;
  }

  public void setCreateAt(LocalDateTime createAt) {
    this.createAt = createAt;
  }

  public void setUser(Long user) {
    this.user = user;
  }
}
