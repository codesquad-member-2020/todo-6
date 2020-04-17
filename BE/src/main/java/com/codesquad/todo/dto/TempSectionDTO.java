package com.codesquad.todo.dto;

public class TempSectionDTO {
  private Long id;
  private String name;

  public SectionDto mapToSectionDto() {
    return new SectionDto(this.id, this.name);
  }
}
