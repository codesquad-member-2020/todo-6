package com.codesquad.todo.service;

import com.codesquad.todo.domain.*;
import com.codesquad.todo.dto.CardDto;
import com.codesquad.todo.exeption.NotFoundData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
  @Autowired
  ProjectRepository projectRepository;
  @Autowired
  SectionRepository sectionRepository;

  public CardDto createCard(Long sectionId, Card card, User user) {
    final int addAtFirst = 0;
    Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new NotFoundData("해당 컬럼이 존재하지 않습니다"));
    section.addCard(card, user, addAtFirst);
    sectionRepository.save(section);
    createCardActivity("add", section, section, card, user);
    return new CardDto(section.getNewCard(), user);
  }

  public void createCardActivity(String action, Section source, Section destination, Card card, User user) {
    Project project = projectRepository.findById(1L).get();
    Activity activity = new Activity(action, source, destination, card, user);
    project.getActivities().add(activity);
    projectRepository.save(project);
  }
}
