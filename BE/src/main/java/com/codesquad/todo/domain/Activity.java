package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Activity {
  @Id
  private int id;
  private String action;
  private String source;
  private String destination;
  private String card;
  private String user;
  private LocalDateTime createdAt = LocalDateTime.now();

  public Activity(){}

  public Activity(String action, String card, String user) {
    this.action = action;
    this.card = card;
    this.source = "";
    this.destination = "";
    this.card = card;
    this.user = user;
  }

  public Activity(String action,String card, String user, String source){
    this.action = action;
    this.card = card;
    this.source = source;
    this.destination = source;
    this.card = card;
    this.user = user;
  }

  public Activity(String action,String card, String user, String source, String destination){
    this.action = action;
    this.card = card;
    this.source = source;
    this.destination = destination;
    this.card = card;
    this.user = user;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public String getCard() {
    return card;
  }

  public void setCard(String card) {
    this.card = card;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
