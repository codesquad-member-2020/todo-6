import { ICON_TYPE } from '../utils/constants';

export interface Card {
  id: number;
  contents: string;
  deleted: boolean;
}

const CLASS_NAME = {
  id: (columnId: string, idNum: number): string => {
    return `${columnId}${idNum}`;
  },
  card: 'card',
  icon: 'card-icon material-icons secondary-icon',
  deleteBtn: 'delete-btn icon-secondary-btn material-icons secondary-icon',
  content: 'card-content',
  author: 'card-author small-text',
};

const AUTHOR_STRING: string = '가 추가함';

export const createCardElement = (columnId: string, cardsData: Card, author: string): string => {
  return cardsData.reduce((allCardElement: string, cardData: Card): string => {
    const { id, contents, _ignore } = cardData;
    allCardElement += `<article id="${CLASS_NAME.id(columnId, id)}" class="${CLASS_NAME.card}"><i class="${CLASS_NAME.icon}">${ICON_TYPE.bookmark}</i>
    <button class="${CLASS_NAME.deleteBtn}">${ICON_TYPE.delete}</button>
    <h3 class="${CLASS_NAME.content}">${contents}</h3>
    <span class="${CLASS_NAME.author}"><strong>${author}</strong>${AUTHOR_STRING}</span></article>`;
    return allCardElement;
  }, '');
};
