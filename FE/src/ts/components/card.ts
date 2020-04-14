import { ICON_TYPE, DATA_ATTRIBUTE } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { renderDeleteModal, renderEditModal } from './columnWrap';
import { columnElement } from './column';
import { modalElement, setModalElement, DELETE_MODAL, EDIT_MODAL } from './modal';

export const author = {
  userId: '',
};

export interface Card {
  id: number;
  contents: string;
}

export const CARD_CLASS = {
  card: 'card',
  icon: 'card-icon material-icons secondary-icon',
  deleteBtn: 'delete-btn icon-secondary-btn material-icons secondary-icon',
  content: 'card-content',
  author: 'card-author small-text',
};

const AUTHOR_STRING: string = ' (이)가 추가함';

const CARD_ATOM = {
  icon: htmlElements.icon(CARD_CLASS.icon, ICON_TYPE.bookmark),
  deleteBtn: htmlElements.button(CARD_CLASS.deleteBtn, ICON_TYPE.delete),
  content: (text: string): string => htmlElements.h3(CARD_CLASS.content, text),
  author: (author: string): string => htmlElements.span(CARD_CLASS.author, htmlElements.strong(author), AUTHOR_STRING),
};

export const getCardId = (targetCard: any): any => targetCard.dataset.cardId;

export const cardElement = (target: any): any => target.closest(`.${CARD_CLASS.card}`);

export const templateCardElement = (columnId: number, cardData: Card, author: string): string => {
  const { id, contents } = cardData;
  return `<article ${DATA_ATTRIBUTE.columnId}="${columnId}", ${DATA_ATTRIBUTE.cardId}="${id}", class="${CARD_CLASS.card}">
    ${CARD_ATOM.icon}
    ${CARD_ATOM.deleteBtn}
    ${CARD_ATOM.content(contents)}
    ${CARD_ATOM.author(author)}</article>`;
};

export const templateAllCardElement = (columnId: number, cardsData: Array<Card>, author: string): string => {
  return cardsData.reduce((allCardElement: string, eachCardData: Card): string => {
    allCardElement += templateCardElement(columnId, eachCardData, author);
    return allCardElement;
  }, '');
};

const clickCardDeleteButton = ({ target }: any): void => {
  if (target.className !== CARD_CLASS.deleteBtn) return;
  modalElement.targetColumn = columnElement(target);
  modalElement.targetCard = cardElement(target);
  renderDeleteModal();
  setModalElement(DELETE_MODAL);
};

const doubleClickCard = ({ target }: any): void => {
  if (target.className !== CARD_CLASS.card) return;
  modalElement.targetCard = cardElement(target);
  modalElement.targetCardContent = modalElement.targetCard.querySelector(`.${CARD_CLASS.content}`);
  renderEditModal(modalElement.targetCardContent.innerHTML);
  setModalElement(EDIT_MODAL);
};

export const cardClickHandler = (event: any): any => {
  clickCardDeleteButton(event);
};

export const cardDoubleClickHandler = (event: any): any => {
  doubleClickCard(event);
};
