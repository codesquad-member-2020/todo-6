package com.codesquad.todo.service;

import com.codesquad.todo.domain.*;
import com.codesquad.todo.dto.*;
import com.codesquad.todo.exeption.NotFoundData;
import com.codesquad.todo.utill.Action;
import com.codesquad.todo.utill.ErrorMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {
  @Autowired
  ProjectRepository projectRepository;
  @Autowired
  SectionRepository sectionRepository;

  private Long projectId = 1L;

  public CardDto createCard(Long sectionId, Card card, User user) {
    final int addAtFirst = 0;
    Section section = sectionRepository.findById(sectionId)
                                       .orElseThrow(() -> new NotFoundData(ErrorMessages.NOTFOUND_SECTION));
    section.addCard(card, user, addAtFirst);
    sectionRepository.save(section);
    addCreateCardActivity(section, section, card, user);
    return new CardDto(section.getNewCard(), user);
  }

  public void deleteCard(Long sectionId, Long cardId, User user) {
    Card card = sectionRepository.findCardBySectionIdAndCardId(sectionId, cardId)
                                 .orElseThrow(() -> new NotFoundData(ErrorMessages.NOTFOUND_CARD_SECTION));
    addDeleteOrUpdateCardActivity(Action.DELETE, card, user);
    sectionRepository.deleteCard(sectionId, cardId);
  }

  public void updateCard(Long columnId, Long cardId, Card card, User user) {
    Card foundCard = sectionRepository.findCardBySectionIdAndCardId(columnId, cardId)
                                      .orElseThrow(() -> new NotFoundData(ErrorMessages.NOTFOUND_CARD_SECTION));
    sectionRepository.updateCard(columnId, cardId, card.getContents(), card.getTitle());

    addDeleteOrUpdateCardActivity(Action.UPDATE, card, user);
  }
  
  public List<ActivityDto> getAllActivity() {
    return projectRepository.findAllActivity(projectId);
  }

  public List<SectionDto> getAllInProject() {
    List<SectionDto> resultSet = new ArrayList<>();
    List<TempSectionDTO> tempSection =  projectRepository.findAllSectionInProject();
    tempSection.forEach(temp-> resultSet.add(temp.mapToSectionDto()));
    resultSet.forEach(section -> section.setCard(projectRepository.findAllCardinEachSection(section.getId())));
    return resultSet;
  }

  private void addCreateCardActivity(Section source, Section destination, Card card, User user) {
    Project project = selectProject();
    Activity activity = new Activity(Action.ADD, source, destination, card, user);
    project.addActivity(activity);
    projectRepository.save(project);
  }

  private void addDeleteOrUpdateCardActivity(Action action, Card card, User user) {
    Project project = selectProject();
    Activity activity = new Activity(action, card, user);
    project.addActivity(activity);
    projectRepository.save(project);
  }

  private Project selectProject() {
    return projectRepository.findById(projectId).orElseThrow(() -> new NotFoundData(ErrorMessages.NOTFOUND_PROJECT));
  }
}
