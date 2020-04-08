import { ICON_TYPE } from '../utils/constants';

interface ICardView {
  content: string;
  author: string;
}

const CLASS_NAME = {
  card: 'card',
  icon: 'card-icon material-icons secondary-icon',
  deleteBtn: 'delete-btn icon-secondary-btn material-icons secondary-icon',
  content: 'card-content',
  author: 'card-author small-text',
};

const AUTHOR_STRING: string = '가 추가함';

export class CardView implements ICardView {
  constructor(public content: string, public author: string) {}

  generateCardComponent(): string {
    return `<article class="${CLASS_NAME.card}"><i class="${CLASS_NAME.icon}">${ICON_TYPE.bookmark}</i>
    <button class="${CLASS_NAME.deleteBtn}">${ICON_TYPE.delete}</button>
    <h3 class="${CLASS_NAME.content}">${this.content}</h3>
    <span class="${CLASS_NAME.author}"><strong>${this.author}</strong>${AUTHOR_STRING}</span></article>`;
  }
}
