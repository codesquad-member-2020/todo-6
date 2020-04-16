package com.codesquad.todo.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SectionDto {
  private Long id;
  private String name;
  List<CardDto> card;

  public SectionDto(){};
  public SectionDto(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public void setCard(List<CardDto> card) {
    this.card = card;
  }

  public Long getId() {
    return id;
  }
}
