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
  private LocalDateTime createdAt;
  private Long user;

  public Activity(){}

  public Activity(String action, Section source, Section destination, Card card, User user) {
    this.action = action;
    this.source = source.getName();
    this.destination = destination.getName();
    this.card = card.getTitle();
    this.createdAt = LocalDateTime.now();
    this.user = user.getId();
  }

  public Activity(String action, Card card, User user) {
    this.action = action;
    this.source = "";
    this.destination = "";
    this.card = card.getContents();
    this.createdAt = LocalDateTime.now();
    this.user = user.getId();
  }

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

  public void setCreateAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUser(Long user) {
    this.user = user;
  }
}
