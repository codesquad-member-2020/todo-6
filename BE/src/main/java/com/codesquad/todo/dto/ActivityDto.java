package com.codesquad.todo.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ActivityDto {

  private Long id;
  private String action;
  private String source;
  private String destination;
  private String card;
  private String createdAt;
  private String userId;
}
