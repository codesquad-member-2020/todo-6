package com.codesquad.todo.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Section {
  @Id
  private Long id;
  private String name;
  private List<Card> cards;

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCards(List<Card> cards) {
    this.cards = cards;
  }

  public String getName() {
    return name;
  }

  public List<Card> getCards() {
    return cards;
  }

  public Card getNewCard() {
    return cards.get(0);
  }

  public Card getCard(int sectionKey) {
    return cards.get(sectionKey);
  }

  public void addCard(Card card, User user, int position) {
    card.setUser(user);
    this.cards.add(position, card);
  }

  public void addCardForMove(Card card, int position) {
    int atFirst = 0;

    if(position<0) {
      this.cards.add(atFirst,card);
      return;
    }

    if(position>=cards.size()) {
      this.cards.add(card);
      return;
    }

    this.cards.add(position,card);
  }

  public void removeCard(int sectionKey) {
    cards.remove(sectionKey);
  }

  public void moveCardInSameSection(int columnKey, int position) {
    Card targetCard = getCard(columnKey);
    cards.remove(columnKey);
    cards.add(position,targetCard);
  }
}
