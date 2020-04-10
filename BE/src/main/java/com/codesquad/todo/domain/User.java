package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Embedded;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class User {
  @Id
  private int id;
  private String userId;
  private String name;
  private List<Project> project;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Project> getProject() {
    return project;
  }

  public void setProject(List<Project> project) {
    this.project = project;
  }

  public Card createCard(int sectionId, Card card) {
    final int currentProject = 0;
    final int sectionPosition = sectionId-1;
    return this.project.get(currentProject).createCardAtSection(sectionPosition, card);
  }

  public void recordActivity(String action, Card card, int sectionId) {
    final int currentProject = 0;
    final int sectionPosition = sectionId-1;
    if (action.equals("add")) {
      this.project.get(currentProject).addActivity(card, this.userId, sectionPosition);
    }
  }
}
