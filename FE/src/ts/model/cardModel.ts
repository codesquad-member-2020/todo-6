interface ICard {
  content: string;
  author: string;
}

export class Card implements ICard {
  constructor(public content: string, public author: string) {}
}
