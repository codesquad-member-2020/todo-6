package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Section {
  @Id
  private int id;
  private String name;
  private List<Card> card;
}
