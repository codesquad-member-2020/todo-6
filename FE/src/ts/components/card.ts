import { ICON_TYPE } from '../utils/constants';
import { HTML_ELEMENT } from '../utils/htmlElement';
import { renderDeleteModal } from './container';
import { columnElement } from './column';
import { modalElement, setModalElement } from './modal';

export const author = {
  userId: '',
};

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
  icon: HTML_ELEMENT.icon(CARD_CLASS.icon, ICON_TYPE.bookmark),
  deleteBtn: HTML_ELEMENT.button(CARD_CLASS.deleteBtn, ICON_TYPE.delete),
  content: (text: string): string => HTML_ELEMENT.h3(CARD_CLASS.content, text),
  author: (author: string): string => HTML_ELEMENT.span(CARD_CLASS.author, HTML_ELEMENT.strong(author), AUTHOR_STRING),
};

export const cardElement = (event: any): any => event.target.closest(`.${CARD_CLASS.card}`);

export const templateCardElement = (columnId: string, cardData: Card, author: string): string => {
  const { id, contents } = cardData;
  console.log(id, contents);
  return `<article id="${CARD_CLASS.id(columnId, id)}" class="${CARD_CLASS.card}">
    ${CARD_ATOM.icon}
    ${CARD_ATOM.deleteBtn}
    ${CARD_ATOM.content(contents)}
    ${CARD_ATOM.author(author)}</article>`;
};

export const templateAllCardElement = (columnId: string, cardsData: Array<Card>, author: string): string => {
  return cardsData.reduce((allCardElement: string, eachCardData: Card): string => {
    allCardElement += templateCardElement(columnId, eachCardData, author);
    return allCardElement;
  }, '');
};

const clickCardDeleteButton = (event: any): void => {
  if (event.target.className !== CARD_CLASS.deleteBtn) return;
  modalElement.targetColumn = columnElement(event);
  modalElement.targetCard = cardElement(event);
  renderDeleteModal();
  setModalElement();
};

export const cardClickHandler = (event: any): any => {
  clickCardDeleteButton(event);
};
