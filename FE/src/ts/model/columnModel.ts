import { Card } from './cardModel';

interface IColumn {
  cards: Array<Card>;
  title: string;
}

export class Column implements IColumn {
  cards: Array<Card>;
  constructor(public title: string) {
    this.cards = [];
  }

  getCard(index: number): Card {
    return this.cards[index];
  }

  getCardIndex(targetCard: Card): number {
    return this.cards
      .map(card => JSON.stringify(card))
      .indexOf(JSON.stringify(targetCard));
  }

  getCardsSize(): number {
    return this.cards.length;
  }

  addCard(content: string, author: string): void {
    this.cards.push(new Card(content, author));
  }

  insertCard(index: number, card: Card): void {
    this.cards.splice(index, 0, card);
  }

  removeCard(index: number): void {
    this.cards.splice(index, 1);
  }

  updateCard(index: number, newContent: string): void {
    this.cards[index].content = newContent;
  }
}
