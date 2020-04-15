package com.codesquad.todo.dto;

public class TempSectionDTO {
  private Long id;
  private String name;

  public SectionDto mapToSectionDto(TempSectionDTO temp) {
    return new SectionDto(temp.id, temp.name);
  }
}
