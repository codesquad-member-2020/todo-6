interface ICardModel {
  content: string;
  author: string;
}

export class CardModel implements ICardModel {
  constructor(public content: string, public author: string) {}
}
