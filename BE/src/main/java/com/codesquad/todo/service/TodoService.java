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

  private void createCardActivity(String action, Section source, Section destination, Card card, User user) {
    Project project = selectProject();
    Activity activity = new Activity(action, source, destination, card, user);
    project.addActivity(activity);
    projectRepository.save(project);
  }

  public void deleteCard(Long sectionId, Long cardId, User user) {
    Card card = sectionRepository.findCardBySectionIdAndCardId(sectionId, cardId)
                                 .orElseThrow(() -> new NotFoundData("컬럼 혹은 카드가 존재하지 않습니다"));
    deleteOrUpdateCardActivity("delete", card, user);
    sectionRepository.deleteCard(sectionId, cardId);
  }

  private void deleteOrUpdateCardActivity(String action, Card card, User user) {
    Project project = selectProject();
    Activity activity = new Activity(action, card, user);
    project.addActivity(activity);
    projectRepository.save(project);
  }

  public void updateCard(Long columnId, Long cardId, Card card, User user) {
    Card foundCard = sectionRepository.findCardBySectionIdAndCardId(columnId, cardId).orElseThrow(() -> new NotFoundData("컬럼 혹은 카드가 존재하지 않습니다."));
    sectionRepository.updateCard(columnId, cardId, card.getContents(), card.getTitle());

    deleteOrUpdateCardActivity("update", card, user);
  }

  private Project selectProject() {
    return projectRepository.findById(1L).orElseThrow(() -> new NotFoundData("해당 프로젝트가 없습니다"));
  }
}
