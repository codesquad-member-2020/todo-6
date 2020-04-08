import { CardModel } from './cardModel';

interface IColumnModel {
  cards: Array<CardModel>;
  title: string;
}

export class ColumnModel implements IColumnModel {
  constructor(public title: string, public cards: Array<CardModel> = []) {}

  getCardModel(index: number): CardModel {
    return this.cards[index];
  }

  getCardModelIndex(targetCard: CardModel): number {
    return this.cards
      .map(card => JSON.stringify(card))
      .indexOf(JSON.stringify(targetCard));
  }

  getCardModelsSize(): number {
    return this.cards.length;
  }

  addCardModel(content: string, author: string): void {
    this.cards.push(new CardModel(content, author));
  }

  insertCardModel(index: number, card: CardModel): void {
    const { content, author } = card;
    this.cards.splice(index, 0, new CardModel(content, author));
  }

  removeCardModel(index: number): void {
    this.cards.splice(index, 1);
  }

  updateCardModel(index: number, newContent: string): void {
    this.cards[index].content = newContent;
  }
}
