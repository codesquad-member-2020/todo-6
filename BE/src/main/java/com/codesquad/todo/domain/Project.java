package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Project {
  @Id
  private Long id;
  private String name;
  private List<Section> sections;
  private List<Activity> activities;
  private List<User> users;

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSections(List<Section> sections) {
    this.sections = sections;
  }

  public void setActivities(List<Activity> activities) {
    this.activities = activities;
  }

  public void addActivity(Activity activity) {
    final int addAtFirst = 0;
    this.activities.add(addAtFirst, activity);
  }
}
