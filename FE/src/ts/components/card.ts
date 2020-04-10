import { ICON_TYPE } from '../utils/constants';

export interface Card {
  id: number;
  contents: string;
}

export const CARD_CLASS = {
  id: (columnId: string, idNum: number): string => {
    return `${columnId}${idNum}`;
  },
  card: 'card',
  icon: 'card-icon material-icons secondary-icon',
  deleteBtn: 'delete-btn icon-secondary-btn material-icons secondary-icon',
  content: 'card-content',
  author: 'card-author small-text',
};

const AUTHOR_STRING: string = ' (이)가 추가함';

const CARD_ATOM = {
  icon: `<i class="${CARD_CLASS.icon}">${ICON_TYPE.bookmark}</i>`,
  deleteBtn: `<button class="${CARD_CLASS.deleteBtn}">${ICON_TYPE.delete}</button>`,
  content: (text: string): string => `<h3 class="${CARD_CLASS.content}">${text}</h3>`,
  author: (author: string): string => `<span class="${CARD_CLASS.author}"><strong>${author}</strong>${AUTHOR_STRING}</span></article>`,
};

export const createCardElement = (columnId: string, cardData: Card, author: string): string => {
  const { id, contents } = cardData;
  return `<article id="${CARD_CLASS.id(columnId, id)}" class="${CARD_CLASS.card}">
    ${CARD_ATOM.icon}
    ${CARD_ATOM.deleteBtn}
    ${CARD_ATOM.content(contents)}
    ${CARD_ATOM.author(author)}</article>`;
};

export const createAllCardElement = (columnId: string, cardsData: Array<Card>, author: string): string => {
  return cardsData.reduce((allCardElement: string, eachCardData: Card): string => {
    allCardElement += createCardElement(columnId, eachCardData, author);
    return allCardElement;
  }, '');
};
