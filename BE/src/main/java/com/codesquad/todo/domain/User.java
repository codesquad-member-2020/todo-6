package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class User {
  @Id
  private int id;
  private String user_id;
  private String name;
  private List<Section> section;
}
